"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LayoutDashboard, Settings, LogOut, ChevronDown } from "lucide-react";
import { signOut } from "@/lib/auth-client";

type User = {
  name?: string;
  email?: string;
  image?: string;
};

export function UserMenu({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name?: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group focus:outline-none"
      >
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden transition-all duration-300 group-hover:border-ugen-primary group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          {user?.image ? (
            <img src={user.image} alt="User Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-medium text-white">{getInitials(user?.name)}</span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-white/60 transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "group-hover:text-white"}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-56 p-2 rounded-2xl glass border border-white/10 shadow-2xl origin-top-right z-50 flex flex-col gap-1"
          >
            <div className="px-3 py-2 mb-2 border-b border-white/10">
              <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
              <p className="text-xs text-white/50 truncate">{user?.email || "user@example.com"}</p>
            </div>

            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>

            <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
              <User size={16} />
              Profile
            </Link>

            <Link href="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
              <Settings size={16} />
              Settings
            </Link>

            <div className="h-[1px] w-full bg-white/10 my-1" />

            <button 
              onClick={async () => {
                setIsOpen(false);
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/");
                    },
                  },
                });
              }} 
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
