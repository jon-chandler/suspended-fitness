import express from "express"
import bodyParser from "body-parser"
import webpush from "web-push"

const app = express()
const PORT = 3000

const vapidKeys = {
    publicKey: "BDN3S4upXA2aqjMH-hA-8xAtML0DDNG0zPqteCDwO2XTXEjciA72NoUhHVswpBcrH8bPeKaBFumiiw8jNMcQZ3U",
    privateKey: "dMptQeanlcYxoDATvWQqix-v7m67MQ5Zn_xQY6molbU",
}

webpush.setVapidDetails(
    "mailto:connect@jonc.work",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const subscriptions = []

app.use(bodyParser.json())

app.post("save-subscription", (req, res) => {
    const subscription = req.body
    subscriptions.push(subscription)
    console.log("Subscription saved:", subscription)
    res.json({ success: true })
})


app.post("send-push", async (req, res) => {
    const payload = JSON.stringify({
        title: "New course dates",
        body: "New courses announced for Advanced users at the Brockwell Lido",
        icon: "/icons/pn-course.png",
        badge: "/icons/pn-badge.png",
        url: "http://suspendedfitness.com/offer.html?cID=123",
  })

  const results = []

    for (const sub of subscriptions) {
        try {
            await webpush.sendNotification(sub, payload)
            results.push({ success: true })
        } catch (err) {
            console.error("Push failed:", err)
            results.push({ success: false, error: err.message })
        }
    }

    res.json({ sent: results.length, results })
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))