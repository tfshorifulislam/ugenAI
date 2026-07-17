"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageSquare, Search } from "lucide-react";
import { UserMenu } from "./user-menu";
import { NotificationMenu } from "./notification-menu";
import { UserSearchModal } from "./user-search-modal";
import { useSession, signOut } from "@/lib/auth-client";
import { useToast } from "@/contexts/toast-context";
import { useRouter } from "next/navigation";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const { toast, success } = useToast();

  const { data: session, isPending } = useSession();
  const user = session?.user || null;
  const allLinks = user ? [...publicLinks, ...getPrivateLinks(user.id)] : publicLinks;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="relative z-10 group flex items-center">
            <span className="text-2xl font-bold tracking-tight text-white transition-colors">
              ugen<span className="text-gradient">AI</span>
            </span>
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

          {/* Auth Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white transition-all duration-300 hover:border-ugen-primary hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  title="Search Users"
                >
                  <Search size={18} />
                </button>
                <Link 
                  href="/chat" 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white transition-all duration-300 hover:border-ugen-primary hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  title="Messages"
                >
                  <MessageSquare size={18} />
                </Link>
                <NotificationMenu />
                <UserMenu user={{ id: user.id, name: user.name || undefined, email: user.email, image: user.image || undefined }} />
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

          {/* Mobile Menu Toggle */}
          {user ? (
            <button
              className="md:hidden relative z-10 p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setSearchOpen(true)}
              title="Search Users"
            >
              <Search size={24} />
            </button>
          ) : (
            <button
              className="md:hidden relative z-10 p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-6 right-6 p-6 glass rounded-2xl md:hidden flex flex-col space-y-6"
          >
            <nav className="flex flex-col space-y-4">
              {allLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${pathname === link.href ? "text-white" : "text-white/60"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="h-[1px] w-full bg-white/10" />
            <div className="flex flex-col space-y-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2 mb-2 border-b border-white/10">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden">
                      {user.image ? (
                        <img src={user.image} alt="User Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium text-white">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user.name || "User"}</p>
                      <p className="text-xs text-white/50">{user.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <Link
                    href="/my-posts"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-white/60 hover:text-white"
                  >
                    My Posts
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-white/60 hover:text-white"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      try {
                        await signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              success("Logged out successfully");
                              router.push("/");
                            },
                            onError: (ctx) => {
                              toast(ctx.error.message || "Failed to log out", "error");
                            }
                          },
                        });
                      } catch (err: unknown) {
                        const errMsg = err instanceof Error ? err.message : "Failed to log out";
                        toast(errMsg, "error");
                      }
                    }}
                    className="text-left text-lg font-medium text-red-400 hover:text-red-300 mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-6 py-3 text-sm font-medium text-white/70 hover:text-white rounded-full transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-6 py-3 text-sm font-medium text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {searchOpen && <UserSearchModal onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </motion.header>
  );
};
