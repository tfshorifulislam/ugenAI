"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, MessageSquare, ArrowLeft, MoreVertical, Search } from "lucide-react";
import { useToast } from "@/contexts/toast-context";

type Conversation = {
  _id: string;
  participants: string[];
  lastMessage: string | null;
  updatedAt: string;
  // Computed on client for display
  otherUser?: { id: string; name: string; image?: string };
};

type Message = {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
};

export default function ChatPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  
  // Mobile view state
  const [showMobileChat, setShowMobileChat] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isUserScrolledUp = useRef(false);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    // Consider "scrolled up" if we are more than 100px from the bottom
    isUserScrolledUp.current = scrollHeight - scrollTop - clientHeight > 100;
  };

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user) {
      fetchConversations().then((loadedConversations) => {
        if (loadedConversations && !activeConversation) {
          const urlParams = new URLSearchParams(window.location.search);
          const convId = urlParams.get("conversationId");
          if (convId) {
            const conv = loadedConversations.find((c: Conversation) => c._id === convId);
            if (conv) {
              handleSelectConversation(conv);
            }
          }
        }
      });
    }
  }, [session]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isUserScrolledUp.current) {
      scrollToBottom();
    }
  }, [messages]);

  const fetchConversations = async (isPolling = false) => {
    try {
      const res = await fetch("/api/messages/conversations");
      if (!res.ok) throw new Error("Failed to load conversations");
      const data = await res.json();
      
      // The backend now provides `otherUser`, so we just deduplicate
      const uniqueConversations = data.conversations.filter((v: Conversation, i: number, a: Conversation[]) => 
        a.findIndex(t => t._id === v._id) === i
      );
      
      setConversations(uniqueConversations);
      return uniqueConversations;
    } catch (error) {
      if (!isPolling) toast("Failed to load conversations", "error");
    } finally {
      if (!isPolling) setIsLoadingConversations(false);
    }
  };

  const fetchMessages = async (conv: Conversation, isPolling = false) => {
    if (!isPolling) setIsLoadingMessages(true);
    try {
      const res = await fetch(`/api/messages/${conv._id}`);
      if (!res.ok) throw new Error("Failed to load messages");
      const data = await res.json();
      setMessages(prev => {
        // Prevent unnecessary state updates if no new messages
        if (isPolling && prev.length === data.messages.length) {
          return prev;
        }
        return data.messages;
      });
    } catch (error) {
      if (!isPolling) toast("Failed to load messages", "error");
    } finally {
      if (!isPolling) setIsLoadingMessages(false);
    }
  };

  // Polling for real-time messages and conversations
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchConversations(true);
      if (activeConversation) {
        fetchMessages(activeConversation, true);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [activeConversation]);

  const handleSelectConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    setShowMobileChat(true);
    isUserScrolledUp.current = false; // Reset scroll state when changing chats
    fetchMessages(conv);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !activeConversation || !session?.user) return;
    
    setIsSending(true);
    const text = inputMessage.trim();
    setInputMessage("");
    
    try {
      const otherId = activeConversation.participants.find(id => id !== session.user.id);
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: activeConversation._id,
          receiverId: otherId,
          text
        })
      });
      
      if (!res.ok) throw new Error("Failed to send");
      const data = await res.json();
      
      setMessages(prev => [...prev, data.message]);
      
      // Update conversation list locally
      setConversations(prev => prev.map(c => 
        c._id === activeConversation._id 
          ? { ...c, lastMessage: text, updatedAt: new Date().toISOString() } 
          : c
      ).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
      
      // Force scroll to bottom when sending a message
      isUserScrolledUp.current = false;
      setTimeout(scrollToBottom, 100);
      
    } catch (error) {
      toast("Failed to send message", "error");
      setInputMessage(text); // Restore input
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ugen-bg">
        <Loader2 className="w-8 h-8 text-ugen-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ugen-bg pt-24 pb-8 px-4 md:px-6 selection:bg-ugen-primary/30">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-ugen-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-ugen-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto h-[calc(100vh-140px)] flex glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        
        {/* Left Sidebar: Conversations */}
        <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col border-r border-white/10 ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-5 border-b border-white/10 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="text-ugen-primary" size={20} />
              Messages
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-ugen-primary/50 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {isLoadingConversations ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 text-ugen-primary animate-spin" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/60 text-sm">No messages yet. Start a conversation from a creator's profile.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {conversations.filter(conv => 
                  !searchQuery.trim() || conv.otherUser?.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
                ).map(conv => (
                  <button
                    key={conv._id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`w-full text-left p-4 flex items-center gap-4 transition-colors border-b border-white/5 hover:bg-white/5 ${activeConversation?._id === conv._id ? 'bg-white/10 border-l-2 border-l-ugen-primary' : 'border-l-2 border-l-transparent'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {conv.otherUser?.image ? (
                        <img src={conv.otherUser.image} alt={conv.otherUser.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg font-bold text-white">{conv.otherUser?.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-white truncate">{conv.otherUser?.name}</h4>
                        <span className="text-[10px] text-white/40 whitespace-nowrap">
                          {new Date(conv.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 truncate">
                        {conv.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </button>
                ))}
                {conversations.length > 0 && conversations.filter(conv => 
                  !searchQuery.trim() || conv.otherUser?.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
                ).length === 0 && (
                  <div className="p-8 text-center flex flex-col items-center">
                    <p className="text-white/40 text-sm">No users found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Area: Chat Panel */}
        <div className={`flex-1 flex-col bg-black/20 ${!showMobileChat ? 'hidden md:flex' : 'flex'} relative`}>
          {!activeConversation ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <MessageSquare className="w-16 h-16 text-white/10 mb-4" />
              <h3 className="text-xl font-bold text-white/40">Select a conversation</h3>
              <p className="text-white/30 text-sm mt-2">Choose a chat from the left menu to start messaging.</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-white/10 bg-white/5 flex items-center px-4 md:px-6 gap-4 flex-shrink-0">
                <button 
                  className="md:hidden p-2 -ml-2 text-white/70 hover:text-white"
                  onClick={() => setShowMobileChat(false)}
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden">
                  {activeConversation.otherUser?.image ? (
                    <img src={activeConversation.otherUser.image} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-white">{activeConversation.otherUser?.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">{activeConversation.otherUser?.name}</h3>
                </div>
                <button className="text-white/40 hover:text-white transition-colors p-2">
                  <MoreVertical size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div 
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 custom-scrollbar"
              >
                {isLoadingMessages ? (
                  <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-ugen-primary animate-spin" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-white/40 text-sm bg-white/5 px-4 py-2 rounded-full">Say hello!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isMine = msg.senderId === session.user.id;
                    return (
                      <div key={msg._id || idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-2 flex flex-col gap-1 shadow-lg
                            ${isMine 
                              ? 'bg-gradient-to-br from-ugen-primary to-indigo-600 text-white rounded-br-sm' 
                              : 'bg-white/10 backdrop-blur-md border border-white/10 text-white/90 rounded-bl-sm'
                            }`}
                        >
                          <span className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</span>
                          <span className={`text-[10px] self-end ${isMine ? 'text-white/70' : 'text-white/40'}`}>
                            {formatTime(msg.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 border-t border-white/10 bg-black/20">
                <div className="flex items-end gap-3 glass rounded-2xl p-2 border border-white/10 focus-within:border-ugen-primary/50 transition-colors">
                  <textarea
                    rows={1}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 max-h-32 bg-transparent text-sm text-white placeholder-white/30 resize-none px-3 py-2 focus:outline-none custom-scrollbar"
                    style={{ minHeight: '40px' }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isSending}
                    className="w-10 h-10 rounded-xl bg-ugen-primary text-white flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ugen-primary/90 transition-colors mb-0.5"
                  >
                    {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                  </button>
                </div>
                <div className="mt-2 text-center hidden md:block">
                  <p className="text-[10px] text-white/30">Press Enter to send, Shift + Enter for new line</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
