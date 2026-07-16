import { mongoClient } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { ProfileClient } from "./profile-client";

export const dynamic = "force-dynamic";

async function getPublicProfile(userId: string) {
  const db = mongoClient.db("ugenAI");

  let userDoc = null;
  try {
    if (ObjectId.isValid(userId)) {
      userDoc = await db.collection("user").findOne({ _id: new ObjectId(userId) });
    }
  } catch (error) {
    console.error("Invalid ObjectId format:", error);
  }
  
  if (!userDoc) return null;

  const posts = await db
    .collection("posts")
    .find({ userId: userId, status: "published" })
    .sort({ createdAt: -1 })
    .toArray();

  const stats = {
    posts: posts.length,
    likes: posts.reduce((sum, post) => sum + (post.likes || 0), 0),
    views: posts.reduce((sum, post) => sum + (post.views || 0), 0),
  };

  return {
    user: {
      id: userDoc._id.toString(),
      name: userDoc.name,
      image: userDoc.image,
      createdAt: userDoc.createdAt,
      bio: "AI Prompt Engineer & Creator",
    },
    posts: posts.map(post => ({ ...post, _id: post._id.toString() })),
    stats
  };
}

export default async function PublicProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const profileData = await getPublicProfile(userId);
  if (!profileData) return notFound();

  const { user, posts, stats } = profileData;

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  return <ProfileClient user={user} posts={posts} stats={stats} joinDate={joinDate} />;
}
