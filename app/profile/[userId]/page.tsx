import { auth, mongoClient } from "@/lib/auth";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { ProfileClient } from "./profile-client";
import { PostType } from "@/components/gallery-card";

export const dynamic = "force-dynamic";

async function getPublicProfile(userId: string) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  const isOwner = session?.user?.id === userId;

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

  let savedPosts: PostType[] = [];
  if (isOwner) {
    const savedRelations = await db
      .collection("saved")
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .toArray();

    const savedImageIds = savedRelations.map(rel => new ObjectId(rel.imageId));
    if (savedImageIds.length > 0) {
      const rawSavedPosts = await db
        .collection("posts")
        .find({ _id: { $in: savedImageIds } })
        .toArray();

      const postsMap = new Map(rawSavedPosts.map(p => [p._id.toString(), p]));
      savedPosts = savedRelations
        .map(rel => postsMap.get(rel.imageId))
        .filter((p): p is NonNullable<typeof p> => !!p)
        .map(post => ({
          ...post,
          _id: post._id.toString(),
          isLiked: session?.user?.id ? (post.likedBy || []).includes(session.user.id) : false,
          isSaved: true
        }));
    }
  }

  return {
    user: {
      id: userDoc._id.toString(),
      name: userDoc.name,
      image: userDoc.image,
      createdAt: userDoc.createdAt,
      bio: "AI Prompt Engineer & Creator",
      email: isOwner ? userDoc.email : undefined,
    },
    posts: posts.map(post => ({ 
      ...post, 
      _id: post._id.toString(),
      isLiked: session?.user?.id ? (post.likedBy || []).includes(session.user.id) : false
    })),
    savedPosts,
    stats,
    isOwner
  };
}

export default async function PublicProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const profileData = await getPublicProfile(userId);
  if (!profileData) return notFound();

  const { user, posts, savedPosts, stats, isOwner } = profileData;

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  return <ProfileClient user={user} posts={posts} savedPosts={savedPosts} stats={stats} joinDate={joinDate} isOwner={isOwner} />;
}
