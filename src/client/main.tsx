import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FrameSDK } from "@farcaster/frame-sdk";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

async function initApp() {
  try {
    const sdk = new FrameSDK();

    sdk.on("connect", async (ctx) => {
      console.log("🟣 Connected to Farcaster Frame", ctx);

      const client = new NeynarAPIClient({
        apiKey: "NEYNAR_API_KEY", // بعداً مقدار واقعی می‌ذاریم
      });

      try {
        const user = await client.lookupUserByFid(ctx.fid);
        console.log("✅ User:", user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    });

    sdk.on("disconnect", () => {
      console.log("🔴 Frame disconnected");
    });

    await sdk.connect();
    console.log("✅ Frame SDK initialized successfully!");
  } catch (err) {
    console.error("❌ Error initializing Farcaster SDK:", err);
  }
}

initApp();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);