import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🟣 New Farcaster SDK import
import { createFrame } from "@farcaster/frame-sdk";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

async function initFarcaster() {
  try {
    // 🟪 Create Farcaster Frame instance
    const frame = createFrame({
      debug: true,
      onConnect: async (ctx) => {
        console.log("🟢 Frame connected:", ctx);

        // 🪪 Neynar client initialization (replace with your API key later)
        const client = new NeynarAPIClient({
          apiKey: "NEYNAR_API_KEY", // TODO: replace with your real key
        });

        // 🧑 Fetch user data using FID (Farcaster ID)
        try {
          const user = await client.lookupUserByFid(ctx.fid);
          console.log("👤 Connected Farcaster User:", user);
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      },
      onDisconnect: () => {
        console.log("🔴 Frame disconnected");
      },
    });

    console.log("✅ Farcaster Frame initialized:", frame);
  } catch (err) {
    console.error("❌ Error initializing Farcaster SDK:", err);
  }
}

// 🚀 Run SDK setup on app load
initFarcaster();

// 🧱 Render React App
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);