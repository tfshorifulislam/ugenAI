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
    
    // Fetch notifications for the logged-in user
    const notifications = await db
      .collection("notifications")
      .find({ receiverId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(50) // Limit to recent 50 notifications
      .toArray();

    // Populate sender info
    const populatedNotifications = await Promise.all(
      notifications.map(async (notif) => {
        let sender = {
          id: notif.senderId,
          name: "Unknown User",
          image: null,
        };

        if (notif.senderId && ObjectId.isValid(notif.senderId)) {
          try {
            const userDoc = await db.collection("user").findOne({ _id: new ObjectId(notif.senderId) });
            if (userDoc) {
              sender = {
                id: userDoc._id.toString(),
                name: userDoc.name || "Anonymous",
                image: userDoc.image || null,
              };
            }
          } catch (e) {
            console.error("Failed to fetch sender for notification:", notif.senderId);
          }
        }

        return {
          ...notif,
          sender
        };
      })
    );

    return NextResponse.json({ notifications: populatedNotifications });
  } catch (error: any) {
    console.error("Fetch Notifications Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { notificationId, markAll } = body;

    const db = mongoClient.db("ugenAI");
    const notificationsCollection = db.collection("notifications");

    if (markAll) {
      // Mark all unread notifications for this user as read
      await notificationsCollection.updateMany(
        { receiverId: session.user.id, isRead: false },
        { $set: { isRead: true } }
      );
      return NextResponse.json({ success: true });
    }

    if (!notificationId || !ObjectId.isValid(notificationId)) {
      return NextResponse.json({ error: "Invalid notificationId" }, { status: 400 });
    }

    // Mark specific notification as read
    const result = await notificationsCollection.updateOne(
      { _id: new ObjectId(notificationId), receiverId: session.user.id },
      { $set: { isRead: true } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Notification not found or access denied" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Update Notification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
