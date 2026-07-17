"use client";

import { useState } from "react";
import { GalleryCard, PostType } from "@/components/gallery-card";
import { Sparkles } from "lucide-react";

export function RelatedPosts({ initialPosts }: { initialPosts: PostType[] }) {
  const [posts, setPosts] = useState(initialPosts);

  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-16 w-full max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="text-ugen-primary" size={24} />
        <h2 className="text-2xl font-bold text-white">More to Explore</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <GalleryCard 
            key={post._id} 
            post={post} 
            onUpdateViewCount={(views) => {
              setPosts(current => current.map(p => p._id === post._id ? { ...p, views } : p));
            }} 
          />
        ))}
      </div>
    </div>
  );
}
