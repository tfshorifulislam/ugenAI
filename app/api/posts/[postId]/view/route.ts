import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;

    if (!ObjectId.isValid(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    const db = mongoClient.db("ugenAI");
    const postsCollection = db.collection("posts");
    
    const post = await postsCollection.findOne({ _id: new ObjectId(postId) });
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let hasViewed = false;

    // Check if user is authenticated and has already viewed
    if (userId) {
      hasViewed = (post.viewedBy || []).includes(userId);
    } else {
      // Check cookie for guest
      const viewedCookie = req.cookies.get("viewed_posts")?.value;
      let viewedPosts: string[] = [];
      if (viewedCookie) {
        try { 
          viewedPosts = JSON.parse(viewedCookie); 
        } catch {
          // ignore parsing error
        }
      }
      hasViewed = viewedPosts.includes(postId);
    }

    if (hasViewed) {
      return NextResponse.json({ views: post.views || 0 });
    }

    // Prepare update document
    const updateDoc: { $inc: { views: number }; $addToSet?: { viewedBy: string } } = { $inc: { views: 1 } };
    if (userId) {
      updateDoc.$addToSet = { viewedBy: userId };
    }

    // Increment view count
    await postsCollection.updateOne(
      { _id: new ObjectId(postId) },
      updateDoc as unknown as Document
    );

    const newViews = (post.views || 0) + 1;
    const res = NextResponse.json({ success: true, views: newViews });

    // For guests, we track it in cookies to prevent multiple views
    if (!userId) {
      const viewedCookie = req.cookies.get("viewed_posts")?.value;
      let viewedPosts: string[] = [];
      if (viewedCookie) {
        try { 
          viewedPosts = JSON.parse(viewedCookie); 
        } catch {}
      }
      viewedPosts.push(postId);
      // Keep only last 100 posts to avoid large cookie sizes
      if (viewedPosts.length > 100) {
        viewedPosts.shift();
      }
      res.cookies.set("viewed_posts", JSON.stringify(viewedPosts), { 
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production"
      });
    }

    return res;
  } catch (error) {
    console.error("View Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
