# Axis Robotics Wrapped

A community-made **Wrapped** experience for [Axis Robotics](https://axisrobotics.ai/) contributors.

Turn the stats from your Axis Hub profile into an animated story — and download a shareable card.

> **Unofficial community project.** Not affiliated with or endorsed by Axis Robotics.  
> No Axis API access · No login · You enter your own Hub stats.

---

## Features

- Cinematic intro and scene-based Wrapped story
- Manual profile stats input (username, trajectories, verified %, avg score, points, badges)
- Interactive navigation (tap / space / arrow keys)
- Downloadable **1200×675** share card (PNG)
- Responsive dark UI with Axis-inspired branding

---

## Getting started

**Requirements:** Node.js 20+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm start`     | Run production server    |
| `npm run lint`  | Run ESLint               |

---

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- html-to-image (share card export)

---

## How it works

1. Enter the statistics shown on your **Axis Hub** profile
2. Generate your Wrapped story
3. Step through scenes (journey, trajectories, verified, score, badges, points, summary)
4. Download your share card from the summary screen

---

## Links

- [Axis Robotics](https://axisrobotics.ai/)
- [Axis Robotics on X](https://x.com/axisrobotics)
- [Axis Robotics Discord](https://discord.gg/axisrobotics)

---

## Created by

[@emir_ethh](https://x.com/emir_ethh)

---

## License

Personal / community project. Use at your own discretion.
