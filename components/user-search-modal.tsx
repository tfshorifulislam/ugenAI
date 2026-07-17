"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface UserType {
  id: string;
  name: string;
  image: string | null;
  username: string;
}

export function UserSearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync users state during render when query is empty to avoid setting state in effect
  if (!query.trim() && users.length > 0) {
    setUsers([]);
  }

  useEffect(() => {
    // Focus input on mount
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center pt-[10vh] px-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="relative w-full max-w-lg bg-ugen-bg/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass backdrop-blur-md z-[160]"
      >
        {/* Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-white/40" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-white text-sm placeholder-white/40 focus:ring-0"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-white/40">
              <Loader2 className="w-6 h-6 animate-spin mb-2" />
              <span className="text-xs">Searching database...</span>
            </div>
          ) : query.trim() === "" ? (
            <div className="py-8 text-center text-xs text-white/30">
              Type a name to search for creators
            </div>
          ) : users.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-white/50 mb-1">No creators found</p>
              <p className="text-xs text-white/30">Try checking the spelling or searching another name</p>
            </div>
          ) : (
            <div className="space-y-1">
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    onClose();
                    router.push(`/profile/${u.id}`);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/10">
                      {u.image ? (
                        <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-white">
                          {u.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white group-hover:text-ugen-primary transition-colors">
                        {u.name}
                      </span>
                      {u.username && (
                        <span className="text-xs text-white/40">@{u.username}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/45 group-hover:text-white transition-colors font-medium">
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
