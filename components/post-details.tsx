"use client";

import Link from "next/link";
import { Eye, Sparkles, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { LikeButton } from "@/components/like-button";
import { SaveButton } from "@/components/save-button";
import { useToast } from "@/contexts/toast-context";

type PostType = {
  _id: string;
  image: string;
  title: string;
  category: string;
  description?: string;
  tags?: string[];
  userImage?: string;
  userName: string;
  userId: string;
  createdAt: string;
  likes: number;
  views: number;
  isLiked: boolean;
  isSaved?: boolean;
  prompt?: string;
};

export function PostDetails({ post }: { post: PostType }) {
  const [copied, setCopied] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (post.description) {
      navigator.clipboard.writeText(post.description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyPrompt = () => {
    if (post.prompt) {
      navigator.clipboard.writeText(post.prompt);
      setPromptCopied(true);
      toast("Prompt copied!", "success");
      setTimeout(() => setPromptCopied(false), 2000);
    }
  };

  return (
    <div className="glass rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl">
      {/* Image Section */}
      <div className="w-full md:w-[60%] bg-black/60 flex items-center justify-center p-4">
        <img
          src={post.image}
          alt={post.title}
          className="w-full max-h-[80vh] object-contain rounded-2xl"
        />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-[40%] p-6 md:p-8 flex flex-col bg-ugen-bg/50 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <Link href={`/profile/${post.userId}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
              {post.userImage ? (
                <img src={post.userImage} alt={post.userName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-white">{post.userName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <p className="text-white font-medium group-hover:text-ugen-primary transition-colors">{post.userName}</p>
              <p className="text-xs text-white/50">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors" title="Share">
              <Share2 size={18} />
            </button>
            <SaveButton postId={post._id} initialIsSaved={post.isSaved || false} />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm font-medium mb-6 w-fit">
          <Sparkles size={14} className="text-ugen-accent" />
          {post.category}
        </div>

        {post.description && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider">Prompt Details</h3>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? <span className="text-green-400">Copied!</span> : <span>Copy</span>}
              </button>
            </div>
            <p className="text-white/80 text-sm md:text-base leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
              {post.description}
            </p>
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="text-xs font-medium text-white/60 bg-white/5 px-2 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {post.prompt && (
          <div className="mb-8">
            {post.prompt === "Uploaded Image" ? (
              <div>
                <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">Prompt</h3>
                <p className="text-white/40 text-sm italic bg-white/5 p-4 rounded-xl border border-white/5">
                  This image was uploaded manually, so no AI generation prompt is available.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider">Prompt</h3>
                  <button 
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md"
                  >
                    {promptCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    {promptCopied ? <span className="text-green-400">Copied!</span> : <span>Copy</span>}
                  </button>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5 max-h-32 overflow-y-auto custom-scrollbar">
                  <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap select-all">
                    {post.prompt}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <LikeButton postId={post._id} initialLikes={post.likes || 0} initialIsLiked={post.isLiked || false} />
            <div className="flex items-center gap-2 text-white/60">
              <Eye size={20} />
              <span className="font-medium">{post.views || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
