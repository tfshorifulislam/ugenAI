"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { UserMenu } from "./user-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "ugen-gallery", href: "/ugen-gallery" },
  { name: "LearnAI", href: "/learn-ai" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mock authentication - replace with real auth session later
  // Example for testing: const user = { name: "John Doe", email: "john@example.com", image: "" };
  const user: any = null; 

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
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-white/60"
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
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="relative inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white transition-all duration-300 rounded-full group bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-10 p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    pathname === link.href ? "text-white" : "text-white/60"
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
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-white/60 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-white/60 hover:text-white"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-white/60 hover:text-white"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
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
    </motion.header>
  );
};
