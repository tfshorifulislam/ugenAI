"use client";

import { useEffect, useRef } from "react";

interface PostViewTrackerProps {
  postId: string;
  onUpdate: (views: number) => void;
}

export function PostViewTracker({ postId, onUpdate }: PostViewTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasViewedLocally = useRef(false);

  useEffect(() => {
    // Check local storage so we don't even initiate a request if already viewed locally
    try {
      const viewed = localStorage.getItem(`viewed_${postId}`);
      if (viewed) {
        hasViewedLocally.current = true;
        return;
      }
    } catch {
      // Ignore local storage errors
    }

    const el = ref.current;
    if (!el || hasViewedLocally.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          try {
            localStorage.setItem(`viewed_${postId}`, "true");
          } catch {
            // Ignore
          }
          hasViewedLocally.current = true;

          // Track view on server
          fetch(`/api/posts/${postId}/view`, {
            method: "POST",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.views) {
                onUpdate(data.views);
              }
            })
            .catch((error) => {
              console.error("Failed to track view:", error);
            });

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [postId, onUpdate]);

  return <div ref={ref} className="absolute inset-0 pointer-events-none" />;
}
