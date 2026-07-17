import { auth, mongoClient } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { PostDetails } from "@/components/post-details";
import { Modal } from "@/components/modal";
import { RelatedPosts } from "@/components/related-posts";
import { PostType } from "@/components/gallery-card";

export default async function GalleryPostModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return notFound();

  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });
  const userId = session?.user?.id;

  const db = mongoClient.db("ugenAI");
  const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

  if (!post || post.status !== "published") return notFound();

  let isSaved = false;
  if (userId) {
    const savedDoc = await db.collection("saved").findOne({ userId, imageId: id });
    isSaved = !!savedDoc;
  }

  const serializedPost = {
    ...post,
    _id: post._id.toString(),
    isLiked: userId ? (post.likedBy || []).includes(userId) : false,
    isSaved,
  };

  const relatedPostsRaw = await db.collection("posts")
    .find({ status: "published", _id: { $ne: new ObjectId(id) } })
    .sort({ createdAt: -1 })
    .limit(8)
    .toArray();

  const relatedPosts = relatedPostsRaw.map(rp => ({
    ...rp,
    _id: rp._id.toString(),
    isLiked: userId ? (rp.likedBy || []).includes(userId) : false,
  })) as unknown as PostType[];

  return (
    <Modal>
      <PostDetails post={serializedPost} />
      <RelatedPosts initialPosts={relatedPosts} />
    </Modal>
  );
}
