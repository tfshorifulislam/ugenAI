import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

// MongoDB connection string should be provided via environment variables.
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION || "";

// Since Better Auth might instantiate multiple times in Next.js development mode,
// we reuse the MongoClient instance globally if possible.
const globalForMongo = global as unknown as { mongoClient: MongoClient };

export const mongoClient = globalForMongo.mongoClient || new MongoClient(MONGODB_CONNECTION);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

const db = mongoClient.db("ugenAI"); // You can specify a database name here if needed, e.g., mongoClient.db("ugenai")

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // If you're on a standalone MongoDB instance that doesn't support transactions,
    // you might need to set transaction: false. But atlas replica sets support it.
    // We will provide the client to enable transactions if supported.
    client: mongoClient,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});
