import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query.trim()) {
      return NextResponse.json({ users: [] });
    }

    const db = mongoClient.db("ugenAI");
    const usersCollection = db.collection("user");

    // Case-insensitive regex search on the name field
    const matchedUsers = await usersCollection
      .find({
        name: { $regex: query, $options: "i" },
      })
      .limit(10)
      .toArray();

    const serializedUsers = matchedUsers.map((u) => {
      // Calculate a fallback username if it doesn't exist
      const usernameFallback = u.email ? u.email.split("@")[0] : u.name?.toLowerCase().replace(/\s+/g, "") || "";
      return {
        id: u._id.toString(),
        name: u.name || "Anonymous",
        image: u.image || null,
        username: u.username || usernameFallback,
      };
    });

    return NextResponse.json({ users: serializedUsers });
  } catch (error) {
    console.error("User Search Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
