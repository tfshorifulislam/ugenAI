import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  const client = new MongoClient(process.env.MONGODB_CONNECTION);
  try {
    await client.connect();
    const db = client.db("ugenAI");
    
    const user = await db.collection("user").findOne({});
    console.log("Sample user:");
    console.log(user);

    const post = await db.collection("posts").findOne({});
    console.log("\nSample post userId:", post?.userId);

    const userById = await db.collection("user").findOne({ _id: new ObjectId(post?.userId) });
    console.log("\nUser by post.userId as ObjectId:", userById);
    
    const userByIdString = await db.collection("user").findOne({ id: post?.userId });
    console.log("\nUser by post.userId as string 'id':", userByIdString);

  } finally {
    await client.close();
  }
}

run().catch(console.error);
