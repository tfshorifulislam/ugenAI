import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";
import { ObjectId } from "mongodb";
// import { createNotification } from "@/lib/notifications";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await params;

    if (!ObjectId.isValid(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const db = mongoClient.db("ugenAI");
    const postsCollection = db.collection("posts");
    
    const post = await postsCollection.findOne({ _id: new ObjectId(postId) });
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const likedBy = post.likedBy || [];
    const isCurrentlyLiked = likedBy.includes(userId);

    if (isCurrentlyLiked) {
      // Unlike
      await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { 
          $pull: { likedBy: userId as any },
          $inc: { likes: -1 }
        } as any
      );
      return NextResponse.json({ success: true, isLiked: false, likes: Math.max(0, (post.likes || 1) - 1) });
    } else {
      // Like
      await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { 
          $addToSet: { likedBy: userId as any },
          $inc: { likes: 1 }
        } as any
      );
      
      // TODO: Implement notification
      /*
      if (post.userId !== userId) {
        await createNotification({
          receiverId: post.userId,
          senderId: userId,
          type: "like",
          text: `${session.user.name || "Someone"} liked your post`,
          postId: postId
        });
      }
      */
      
      return NextResponse.json({ success: true, isLiked: true, likes: (post.likes || 0) + 1 });
    }
  } catch (error: any) {
    console.error("Like Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
