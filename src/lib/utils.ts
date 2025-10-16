import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// Patch global for type-safe caching
const globalWithMongoose = global as typeof global & {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

/////////////////////////////////////////////////////////////////////////////////////////////////////

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGO_URI as string;

    if (!uri) throw new Error("Missing MONGO_URI");

    cached.promise = mongoose.connect(uri, {
      dbName: "roadmint",
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};
