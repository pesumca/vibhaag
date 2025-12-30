import { createApp } from "./app";
import { connectDb } from "./db";
import { config } from "./config";

const app = createApp();

connectDb()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`API running on :${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  });
