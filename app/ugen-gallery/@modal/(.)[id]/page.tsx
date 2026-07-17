import { auth, mongoClient } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { PostDetails } from "@/components/post-details";
import { Modal } from "@/components/modal";

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

  const serializedPost = {
    ...post,
    _id: post._id.toString(),
    isLiked: userId ? (post.likedBy || []).includes(userId) : false,
  };

  return (
    <Modal>
      <PostDetails post={serializedPost} />
    </Modal>
  );
}
