# Sanjeev — Hospital & Healthcare Website

A modern, single-page hospital/healthcare website built with React and Vite. Features a cinematic video hero, smooth scroll-triggered animations, and a full set of sections for showcasing a healthcare practice — from services and specialists to patient testimonials and appointment booking.

## Features

- 🎬 **Video hero section** with a looping background video and animated headline reveal
- 🩺 **Doctor profiles** with photo cards for the specialist team
- 🏥 **Services, health packages, and facilities** sections
- 💬 **Patient testimonials**
- 📅 **Appointment call-to-action** and contact section
- ✨ Smooth, scroll-aware animations throughout, powered by Framer Motion
- 📱 Fully responsive layout

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/) — build tool & dev server
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Lucide React](https://lucide.dev/) — icons
- [ESLint](https://eslint.org/) — linting

## Project Structure

```
src/
├── assets/
│   └── doctors/           # Doctor profile photos
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx            # Video background hero
│   ├── HeroVideoBackground.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Doctors.jsx         # Specialist profile cards
│   ├── HealthPackages.jsx
│   ├── WhyChooseUs.jsx
│   ├── Testimonials.jsx
│   ├── Facilities.jsx
│   ├── AppointmentCTA.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/sanjeev.git
cd sanjeev

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be available at `http://localhost:5173`.

### Available Scripts

| Command           | Description                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`      | Start the local development server        |
| `npm run build`     | Build the production bundle to `dist/`     |
| `npm run preview`   | Preview the production build locally       |
| `npm run lint`      | Run ESLint across the project              |

## License

This project is provided as-is for demonstration purposes. Update this section with your chosen license (e.g. MIT) before publishing.
