import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🟣 Farcaster SDK imports
import { initFrame } from "@farcaster/frame-sdk";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

async function initFarcaster() {
  try {
    // 🟪 Initialize the Frame SDK
    const frame = await initFrame({
      debug: true,
      onConnect: async (ctx) => {
        console.log("🟢 Frame connected:", ctx);

        // 🪪 Neynar client initialization (replace with your API key later)
        const client = new NeynarAPIClient({
          apiKey: "NEYNAR_API_KEY", // TODO: replace with your real key from Neynar dashboard
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