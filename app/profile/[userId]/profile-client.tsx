"use client";

import { Heart, Eye, Image as ImageIcon, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type ProfileProps = {
  user: any;
  posts: any[];
  stats: any;
  joinDate: string;
};

export function ProfileClient({ user, posts, stats, joinDate }: ProfileProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-ugen-bg pt-28 pb-16 px-6 selection:bg-ugen-primary/30">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-ugen-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-ugen-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass rounded-3xl p-8 border border-white/10 shadow-2xl mb-12 flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-black/40 border-4 border-ugen-bg flex items-center justify-center overflow-hidden ring-2 ring-ugen-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl md:text-5xl font-bold text-white">{user.name?.charAt(0).toUpperCase() || "U"}</span>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-white">{user.name || "Anonymous User"}</h1>
            </div>
            
            <div className="flex items-center gap-8 mb-6">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-bold text-white">{stats.posts}</span>
                <span className="text-sm text-white/60">Posts</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-bold text-white">{stats.likes}</span>
                <span className="text-sm text-white/60">Likes</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-bold text-white">{stats.views}</span>
                <span className="text-sm text-white/60">Views</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-white/90 text-sm md:text-base">{user.bio}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1"><Calendar size={14} className="text-ugen-accent" /> Joined {joinDate}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Section Title */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center mb-8 border-b border-white/10 pb-4"
        >
          <div className="flex items-center gap-2 text-white font-medium px-4 py-2 border-b-2 border-ugen-primary">
            <ImageIcon size={18} />
            Published Posts
          </div>
        </motion.div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <ImageIcon className="w-10 h-10 text-white/30" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Posts Yet</h3>
            <p className="text-white/50 mb-8 max-w-md text-center">This user hasn't published any AI images yet.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4"
          >
            {posts.map((post: any) => (
              <motion.div variants={itemVariants} key={post._id}>
                <Link 
                  href={`/post/${post._id}`} 
                  className="group relative aspect-square bg-black/40 overflow-hidden md:rounded-2xl border border-transparent md:border-white/5 hover:border-white/20 transition-all cursor-pointer block h-full w-full"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                    <h4 className="text-white font-bold text-lg text-center px-4 line-clamp-1">{post.title}</h4>
                    <div className="flex items-center gap-6 text-white font-medium">
                      <span className="flex items-center gap-2"><Heart size={20} className="fill-white" /> {post.likes}</span>
                      <span className="flex items-center gap-2"><Eye size={20} /> {post.views}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
