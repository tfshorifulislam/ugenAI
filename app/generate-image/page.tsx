"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Loader2, Image as ImageIcon, Sparkles, Send } from "lucide-react";
import { useToast } from "@/contexts/toast-context";

export default function GenerateImagePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { toast, success } = useToast();

  const [prompt, setPrompt] = useState("");
  const [pollinationsUrl, setPollinationsUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Photography");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ugen-bg">
        <Loader2 className="w-8 h-8 text-ugen-primary animate-spin" />
      </div>
    );
  }

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim()) {
      toast("Please enter a prompt first", "warning");
      return;
    }
    
    setIsGenerating(true);
    // Add random seed to allow generating different images for the same prompt
    const seed = Math.floor(Math.random() * 1000000);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&seed=${seed}`;
    setPollinationsUrl(url);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollinationsUrl || !prompt || !title) {
      toast("Please generate an image and fill out the title", "warning");
      return;
    }

    setIsPublishing(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pollinationsUrl,
          prompt,
          title,
          category,
          description,
          tags,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to publish");
      }

      success("Image published successfully!");
      router.push("/ugen-gallery");
    } catch (err: any) {
      toast(err.message || "An unexpected error occurred", "error");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-ugen-bg pt-28 pb-16 px-6 selection:bg-ugen-primary/30">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-ugen-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-ugen-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Generation */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Create an Image</h1>
            <p className="text-white/60">Use Pollinations AI to instantly generate beautiful images.</p>
          </div>

          <div className="glass rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ugen-primary to-ugen-accent opacity-50" />
            
            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">AI Prompt</label>
                <textarea
                  required
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic city with flying cars and neon lights, highly detailed, 8k..."
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-ugen-primary/50 text-white placeholder-white/30 resize-none transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-ugen-primary" />
                    Generate Image
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Preview Area */}
          <div className="aspect-square w-full rounded-3xl glass border border-white/10 overflow-hidden relative flex items-center justify-center bg-black/40">
            {!pollinationsUrl ? (
              <div className="flex flex-col items-center justify-center text-white/40 gap-4">
                <ImageIcon className="w-12 h-12 opacity-50" />
                <p className="text-sm font-medium">Your generated image will appear here</p>
              </div>
            ) : (
              <>
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 backdrop-blur-sm">
                    <Loader2 className="w-10 h-10 text-ugen-primary animate-spin" />
                  </div>
                )}
                <img
                  src={pollinationsUrl}
                  alt="Generated AI Art"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isGenerating ? "opacity-50" : "opacity-100"}`}
                  onLoad={() => setIsGenerating(false)}
                  onError={() => {
                    setIsGenerating(false);
                    toast("Failed to load generated image", "error");
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Right Column: Publish Details */}
        <div className="flex flex-col space-y-6">
          <div className="glass rounded-3xl p-6 border border-white/10 shadow-2xl relative">
            <h2 className="text-xl font-bold text-white mb-6">Publish Details</h2>
            
            <form onSubmit={handlePublish} className="flex flex-col gap-5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Neon City"
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-ugen-primary/50 text-white placeholder-white/30 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[#13141c] border border-white/10 rounded-xl focus:outline-none focus:border-ugen-primary/50 text-white transition-colors appearance-none"
                >
                  <option value="Photography">Photography</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="3D Render">3D Render</option>
                  <option value="Anime">Anime</option>
                  <option value="Concept Art">Concept Art</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="cyberpunk, futuristic, neon"
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-ugen-primary/50 text-white placeholder-white/30 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider pl-1">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share some thoughts about this generation..."
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-ugen-primary/50 text-white placeholder-white/30 resize-none transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isPublishing || !pollinationsUrl || isGenerating}
                  type="submit"
                  className="w-full py-4 px-4 bg-gradient-to-r from-ugen-primary to-ugen-accent text-white font-medium rounded-xl shadow-lg shadow-ugen-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPublishing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Publish Post
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
