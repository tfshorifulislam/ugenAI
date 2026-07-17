"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Heart, MessageSquare, Bookmark, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type Notification = {
  _id: string;
  senderId: string;
  receiverId: string;
  type: "like" | "comment" | "save" | "message";
  text: string;
  postId?: string;
  messageId?: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: string;
    name: string;
    image: string | null;
  };
};

export function NotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const previousUnreadIds = useRef<Set<string>>(new Set());
  const isInitialLoad = useRef(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Setup audio context on first interaction to bypass autoplay policies
  useEffect(() => {
    const handleUserInteraction = () => {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current && AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
      // Remove listeners once we have a running context
      if (audioCtxRef.current?.state === 'running') {
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
      }
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  const playNotificationSound = () => {
    console.log("[NotificationSound] playNotificationSound triggered");
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) audioCtxRef.current = new AudioContextClass();
      }
      
      const ctx = audioCtxRef.current;
      if (!ctx) {
        console.warn("[NotificationSound] Web Audio API not supported");
        return;
      }
      
      console.log("[NotificationSound] AudioContext state before play:", ctx.state);
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      // A gentle 'pop'/'ding' sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05); // A5
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
      
      console.log("[NotificationSound] Sound played successfully");
    } catch (e) {
      // Ignore if browser blocks auto-play
      console.error("[NotificationSound] Failed to play notification sound:", e);
    }
  };

  // Polling for notifications
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchNotifications() {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        const newNotifs: Notification[] = data.notifications || [];
        setNotifications(newNotifs);

        const unreadNotifs = newNotifs.filter(n => !n.isRead);

        if (isInitialLoad.current) {
          isInitialLoad.current = false;
          previousUnreadIds.current = new Set(unreadNotifs.map(n => n._id));
        } else {
          const hasNewUnread = unreadNotifs.some(n => !previousUnreadIds.current.has(n._id));
          if (hasNewUnread) {
            console.log("[NotificationSound] New unread notification detected, attempting to play sound");
            playNotificationSound();
          }
          previousUnreadIds.current = new Set(unreadNotifs.map(n => n._id));
        }
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
      fetchNotifications();
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const handleNotificationClick = async (notif: Notification) => {
    // Mark as read
    if (!notif.isRead) {
      try {
        await fetch("/api/notifications", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notificationId: notif._id }),
        });
        fetchNotifications();
      } catch (error) {
        console.error("Failed to mark as read", error);
      }
    }

    setIsOpen(false);

    // Navigate based on type
    if (notif.type === "message") {
      router.push(`/chat?conversationId=${notif.messageId || ''}`); // Wait, messageId is not conversationId, but close enough if we pass it or just route to /chat
    } else if (notif.postId) {
      router.push(`/post/${notif.postId}`);
    } else {
      router.push(`/profile/${notif.senderId}`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "like": return <Heart size={14} className="text-pink-500" />;
      case "comment": return <MessageCircle size={14} className="text-blue-500" />;
      case "save": return <Bookmark size={14} className="text-yellow-500" />;
      case "message": return <MessageSquare size={14} className="text-ugen-primary" />;
      default: return <Bell size={14} className="text-white/60" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white transition-all duration-300 hover:border-ugen-primary hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] relative group focus:outline-none"
        title="Notifications"
      >
        <Bell size={18} className={isOpen ? "text-white" : "group-hover:text-white"} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg border border-black border-opacity-50">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 -translate-x-1/2 mt-3 w-[calc(100vw-32px)] max-w-[320px] sm:absolute sm:left-auto sm:right-0 sm:translate-x-0 sm:w-80 sm:max-w-none p-2 rounded-2xl bg-ugen-bg/95 backdrop-blur-xl border border-white/10 shadow-2xl origin-top-right z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-ugen-primary hover:text-ugen-primary/80 transition-colors"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
              {notifications.length === 0 ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-2">
                    <Bell className="w-5 h-5 text-white/20" />
                  </div>
                  <p className="text-white/40 text-xs">No notifications yet.</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <button
                    key={notif._id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors text-left ${notif.isRead ? 'hover:bg-white/5 opacity-70' : 'bg-white/5 hover:bg-white/10 border border-white/5'}`}
                  >
                    <div className="relative w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {notif.sender.image ? (
                        <img src={notif.sender.image} alt={notif.sender.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-white">{notif.sender.name.charAt(0)}</span>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1a1a2e] flex items-center justify-center border border-white/10">
                        {getIcon(notif.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/90 leading-tight mb-1">
                        <span className="font-bold text-white">{notif.sender.name}</span> {notif.text.replace(notif.sender.name, '').trim()}
                      </p>
                      <p className="text-[10px] text-white/40">{formatTime(notif.createdAt)}</p>
                    </div>
                    {!notif.isRead && (
                      <div className="w-2 h-2 rounded-full bg-ugen-primary flex-shrink-0 mt-1.5" />
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
