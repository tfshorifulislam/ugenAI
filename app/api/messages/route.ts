import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { createNotification } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { conversationId, receiverId, text } = body;

    if (!conversationId || !receiverId || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!ObjectId.isValid(conversationId)) {
      return NextResponse.json({ error: "Invalid conversationId format" }, { status: 400 });
    }

    const db = mongoClient.db("ugenAI");
    
    // Verify the conversation exists and user is a participant
    const conversation = await db.collection("conversations").findOne({
      _id: new ObjectId(conversationId),
      participants: session.user.id
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found or access denied" }, { status: 403 });
    }

    const newMessage = {
      conversationId: new ObjectId(conversationId),
      senderId: session.user.id,
      receiverId,
      text,
      createdAt: new Date()
    };

    const messagesCollection = db.collection("messages");
    const result = await messagesCollection.insertOne(newMessage);
    
    const messageRecord = { _id: result.insertedId, ...newMessage };

    // Update the conversation's last message and timestamp
    await db.collection("conversations").updateOne(
      { _id: new ObjectId(conversationId) },
      { 
        $set: { 
          lastMessage: text,
          updatedAt: new Date() 
        } 
      }
    );

    // Trigger Notification
    await createNotification({
      receiverId,
      senderId: session.user.id,
      type: "message",
      text: `${session.user.name || "Someone"} sent you a message`,
      messageId: conversationId, // passing conversationId as messageId for easy routing to chat
    });

    return NextResponse.json({ message: messageRecord }, { status: 201 });
  } catch (error: any) {
    console.error("Send Message Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
