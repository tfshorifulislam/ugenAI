import { mongoClient } from "@/lib/auth";
import { ObjectId } from "mongodb";

export type NotificationType = "like" | "comment" | "save" | "message";

export async function createNotification(data: {
  receiverId: string;
  senderId: string;
  type: NotificationType;
  text: string;
  postId?: string;
  messageId?: string;
}) {
  try {
    const db = mongoClient.db("ugenAI");
    const notificationsCollection = db.collection("notifications");

    const newNotification = {
      receiverId: data.receiverId,
      senderId: data.senderId,
      type: data.type,
      text: data.text,
      postId: data.postId || null,
      messageId: data.messageId || null,
      isRead: false,
      createdAt: new Date(),
    };

    await notificationsCollection.insertOne(newNotification);
    return true;
  } catch (error) {
    console.error("Create Notification Error:", error);
    return false;
  }
}
