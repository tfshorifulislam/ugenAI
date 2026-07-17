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
    
    // Find all conversations where current user is a participant
    const conversations = await db
      .collection("conversations")
      .find({ participants: session.user.id })
      .sort({ updatedAt: -1 })
      .toArray();

    // Populate otherUser
    const populatedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const otherId = conv.participants.find((id: string) => id !== session.user.id);
        if (!otherId) return conv;
        let otherUser: { id: string; name: string; image?: string } = {
          id: otherId,
          name: "Unknown User",
        };
        try {
          if (ObjectId.isValid(otherId)) {
            const userDoc = await db.collection("user").findOne({ _id: new ObjectId(otherId) });
            if (userDoc) {
              otherUser = {
                id: userDoc._id.toString(),
                name: userDoc.name || "Anonymous",
                image: userDoc.image || undefined,
              };
            }
          }
        } catch (e) {
          console.error("Failed to parse ObjectId for otherUser:", otherId);
        }
        return {
          ...conv,
          otherUser
        };
      })
    );

    return NextResponse.json({ conversations: populatedConversations });
  } catch (error: any) {
    console.error("Fetch Conversations Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId: otherUserId } = body;

    if (!otherUserId) {
      return NextResponse.json({ error: "Missing required field: userId" }, { status: 400 });
    }

    if (session.user.id === otherUserId) {
      return NextResponse.json({ error: "Cannot create a conversation with yourself" }, { status: 400 });
    }

    const db = mongoClient.db("ugenAI");
    const conversationsCollection = db.collection("conversations");

    // Check if conversation already exists between these two exact participants
    const existingConversation = await conversationsCollection.findOne({
      participants: { $all: [session.user.id, otherUserId] }
    });

    if (existingConversation) {
      return NextResponse.json({ conversation: existingConversation });
    }

    // Create a new conversation
    const newConversation = {
      participants: [session.user.id, otherUserId],
      lastMessage: null,
      updatedAt: new Date(),
    };

    const result = await conversationsCollection.insertOne(newConversation);
    const conversation = { _id: result.insertedId, ...newConversation };

    return NextResponse.json({ conversation }, { status: 201 });
  } catch (error: any) {
    console.error("Create Conversation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
