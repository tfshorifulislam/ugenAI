"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/contexts/toast-context";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast, success } = useToast();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: signUpError } = await signUp.email({ name, email, password });
      if (signUpError) {
        setError(signUpError.message || "Failed to create account");
        toast(signUpError.message || "Failed to create account", "error");
      } else {
        success("Account created successfully");
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      toast(err.message || "An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const { error: googleError } = await signIn.social({
        provider: "google",
      });
      if (googleError) {
        setError(googleError.message || "Failed to sign up with Google");
        toast(googleError.message || "Failed to sign up with Google", "error");
        setGoogleLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google");
      toast(err.message || "Failed to sign up with Google", "error");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-ugen-bg flex items-center justify-center overflow-hidden selection:bg-ugen-primary/30 py-12">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-ugen-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-ugen-accent/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <Link href="/" className="flex items-center justify-center mb-8">
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ugen-primary to-ugen-accent">
            ugenAI
          </span>
        </Link>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top glow inside card */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ugen-primary via-ugen-accent to-purple-500 opacity-50" />

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
            <p className="text-white/60 text-sm">Join ugenAI to start creating amazing prompts</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-ugen-primary/50 text-white placeholder-white/30 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-ugen-primary/50 text-white placeholder-white/30 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-ugen-primary/50 text-white placeholder-white/30 transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-ugen-primary to-ugen-accent text-white font-medium rounded-xl shadow-lg shadow-ugen-primary/20 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
            </motion.button>
          </form>

          <div className="mt-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={googleLoading}
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </>
              )}
            </motion.button>
          </div>

          <div className="mt-8 text-center text-sm text-white/50">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:text-ugen-primary transition-colors font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
