import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { pollinationsUrl, base64Image, prompt, title, category, description, tags } = body;

    if ((!pollinationsUrl && !base64Image) || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let finalBase64Image = base64Image;

    // Fetch the image from Pollinations to convert to base64 for ImgBB if no manual image provided
    if (pollinationsUrl && !finalBase64Image) {
      const imgRes = await fetch(pollinationsUrl);
      if (!imgRes.ok) {
        throw new Error("Failed to fetch image from Pollinations AI");
      }
      const buffer = await imgRes.arrayBuffer();
      finalBase64Image = Buffer.from(buffer).toString("base64");
    }

    // Strip data URL prefix if present in the manually uploaded image
    if (finalBase64Image && finalBase64Image.includes(",")) {
      finalBase64Image = finalBase64Image.split(",")[1];
    }

    // Upload to ImgBB
    const imgbbForm = new FormData();
    imgbbForm.append("key", process.env.IMAGEBB_API || "");
    imgbbForm.append("image", finalBase64Image);

    const imgbbRes = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imgbbForm,
    });
    
    if (!imgbbRes.ok) {
      throw new Error("Failed to upload image to ImgBB");
    }

    const imgbbData = await imgbbRes.json();
    const imgbbUrl = imgbbData.data.url;

    // Save to MongoDB
    const db = mongoClient.db("ugenAI");
    const postsCollection = db.collection("posts");

    const newPost = {
      userId: session.user.id,
      userName: session.user.name || "Anonymous",
      userImage: session.user.image || null,
      image: imgbbUrl,
      prompt: prompt || "Uploaded Image",
      title,
      category: category || "General",
      aiModel: pollinationsUrl ? "Pollinations AI" : "Manual Upload",
      description: description || "",
      tags: tags ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      likes: 0,
      views: 0,
      status: "published",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await postsCollection.insertOne(newPost);

    return NextResponse.json({ success: true, post: { _id: result.insertedId, ...newPost } });
  } catch (error: any) {
    console.error("Publish Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
