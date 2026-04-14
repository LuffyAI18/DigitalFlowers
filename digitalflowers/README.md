# 🌸 DigitalFlowers

> Send love that blooms. Create a stunning digital bouquet, attach a heartfelt note, and share a link that reveals itself beautifully — for exactly 7 days.

**Live Demo:** [your-app.vercel.app](https://your-app.vercel.app)  
**Made by:** [Prajwal M D](https://www.linkedin.com/in/prajwal-m-d)

---

## ✨ Features

- 🌹 **16 flower types** — Rose, Sunflower, Lily, Tulip, Orchid, Lotus, Peony + more
- 🎨 **15 colour palettes** — Classic Red to Champagne, Sunset, Monochrome
- 🎀 **11 wrapping styles**, **9 ribbon options**, **13 arrangement layouts**
- ✨ **12 decoration overlays** — Sparkles, Drifting Petals, Glow, Hearts, Confetti
- ✍️ **Personal message** up to 1,000 characters
- 🔗 **Unique shareable slug** — `digitalflower-{timestamp}-{random}`
- ⏳ **Auto-expires in 7 days** via Firestore TTL policy
- 🤖 **GitHub Actions** daily backup cleanup
- 📱 Fully responsive on mobile, tablet, desktop

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 App Router |
| Database | Firebase Firestore |
| Styling | Tailwind CSS v4 + custom design system |
| Animation | Framer Motion + CSS animations |
| Slug | nanoid + timestamp (base-36) |
| Hosting | Vercel |
| Cleanup | GitHub Actions (daily cron) |
