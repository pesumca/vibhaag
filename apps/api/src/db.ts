import mongoose from "mongoose";

import { config } from "./config";

export async function connectDb() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(config.mongoUrl);
}
