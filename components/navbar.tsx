"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Search } from "lucide-react";
import { UserMenu } from "./user-menu";
import { NotificationMenu } from "./notification-menu";
import { UserSearchModal } from "./user-search-modal";
import { useSession } from "@/lib/auth-client";

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "ugen-gallery", href: "/ugen-gallery" },
  { name: "LearnAI", href: "/learn-ai" },
];

const getPrivateLinks = (userId: string) => [
  { name: "Generate Image", href: "/generate-image" },
  { name: "Profile", href: `/profile/${userId}` },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user || null;
  const allLinks = user ? [...publicLinks, ...getPrivateLinks(user.id)] : publicLinks;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-white/10 px-6 py-3"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2 select-none group"
        >
          {/* Logo Shape */}
          <div className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-linear-to-br from-[#3881f5] via-[#6633ff] to-[#9b5cff] shadow-lg overflow-hidden">
            <Sparkles
              size={20}
              className="text-white md:w-6 md:h-6"/>
            {/* Glow */}
            <span className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition "/>
          </div>


          {/* Text */}
          <h1 className="hidden sm:block text-2xl font-extrabold tracking-tight leading-none text-white ">
            ugen<span className="text-gradient">AI</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {allLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-white/60"
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-ugen-primary rounded-full glow"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center space-x-3 md:space-x-6">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white transition-all duration-300 hover:border-ugen-primary hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                title="Search Users"
              >
                <Search size={16} />
              </button>
              <Link
                href="/chat"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white transition-all duration-300 hover:border-ugen-primary hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                title="Messages"
              >
                <MessageSquare size={16} />
              </Link>
              <NotificationMenu />
              <UserMenu user={{ id: user.id, name: user.name || undefined, email: user.email, image: user.image || undefined }} links={allLinks} />
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && <UserSearchModal onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </motion.header>
  );
};
