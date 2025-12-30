import { connectDb } from "./db";

export async function ensureTestDb() {
  process.env.MONGO_URL = process.env.MONGO_URL ?? "mongodb://mongo:27017/vibhaag_test";
  await connectDb();
}
