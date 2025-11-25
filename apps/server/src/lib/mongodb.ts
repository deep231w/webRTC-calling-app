import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()

const MONGODB_URI = process.env.MONGODB_URI as string;
console.log("db -", MONGODB_URI)
if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "p2p_call_app",
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
