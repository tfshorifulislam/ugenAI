import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = mongoClient.db("ugenAI");
    const userId = session.user.id;

    // Get saved relations
    const savedRelations = await db
      .collection("saved")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    const savedImageIds = savedRelations.map((rel) => new ObjectId(rel.imageId));

    if (savedImageIds.length === 0) {
      return NextResponse.json({ posts: [] });
    }

    // Fetch corresponding posts
    const posts = await db
      .collection("posts")
      .find({ _id: { $in: savedImageIds } })
      .toArray();

    // Map posts to include isLiked and isSaved
    const serializedPosts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      isLiked: (post.likedBy || []).includes(userId),
      isSaved: true,
    }));

    return NextResponse.json({ posts: serializedPosts });
  } catch (error) {
    console.error("Get Saved Posts Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
