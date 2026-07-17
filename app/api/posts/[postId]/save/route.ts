import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";
import { ObjectId } from "mongodb";

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
    const savedCollection = db.collection("saved");

    const userId = session.user.id;

    // Prevent duplicates
    const existing = await savedCollection.findOne({ userId, imageId: postId });
    if (existing) {
      return NextResponse.json({ success: true, message: "Already saved" });
    }

    await savedCollection.insertOne({
      userId,
      imageId: postId,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, isSaved: true });
  } catch (error) {
    console.error("Save Post Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
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
    const savedCollection = db.collection("saved");

    const userId = session.user.id;

    await savedCollection.deleteOne({ userId, imageId: postId });

    return NextResponse.json({ success: true, isSaved: false });
  } catch (error) {
    console.error("Unsave Post Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
