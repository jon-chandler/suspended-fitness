import express from "express";
import bodyParser from "body-parser";
import webpush from "web-push";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

// VAPID keys from web-push generate-vapid-keys
const vapidKeys = {
  publicKey: "BDN3S4upXA2aqjMH-hA-8xAtML0DDNG0zPqteCDwO2XTXEjciA72NoUhHVswpBcrH8bPeKaBFumiiw8jNMcQZ3U",
  privateKey: "dMptQeanlcYxoDATvWQqix-v7m67MQ5Zn_xQY6molbU",
};

// Configure web-push
webpush.setVapidDetails(
  "mailto:connect@jonc.work",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// In-memory subscription storage (replace with DB for production)
const subscriptions = [];

// Middleware
app.use(bodyParser.json());

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost'] , credentials :  true,  methods: 'GET,PUT,POST,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }));


// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Save subscription from client
app.post("/save-subscription", (req, res) => {
  const subscription = req.body;
  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ success: false, message: "Invalid subscription" });
  }
  subscriptions.push(subscription);
  console.log("✅ Subscription stored:", subscription.endpoint);
  res.json({ success: true });
});

// Send push notifications to all stored subscriptions
app.post("/send-push", async (req, res) => {
  if (subscriptions.length === 0) {
    return res.json({ success: false, message: "No subscriptions stored" });
  }

  const payload = JSON.stringify({
    title: req.body?.title || "Suspended Fitness",
    body: req.body?.body || "New course dates available",
    icon: req.body?.icon || "/images/pn-badge.png",
    url: req.body?.url || "/offer.html?cID=456"
  });

  const results = [];
  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
      results.push({ success: true });
    } catch (err) {
      console.error("❌ Push failed:", err);
      results.push({ success: false, error: err.message });
    }
  }

  res.json({ sent: results.length, results });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));