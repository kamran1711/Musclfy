# Aura Player - React Music Dashboard

A beautiful, modern music player dashboard built with React, Vite, and Tailwind CSS.

![Aura Player](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.1.4-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-cyan)

## 🎵 Features

- **Glassmorphic Design** - Beautiful glass-panel aesthetics with backdrop blur
- **Interactive UI** - Fully functional play/pause controls, progress bars, and volume sliders
- **Responsive Layout** - Works seamlessly across desktop and mobile devices
- **Smooth Animations** - Elegant hover effects and transitions
- **Modern Stack** - Built with React 18, Vite, and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **PostCSS** - CSS processing

## 📁 Project Structure

```
aura-player-react/
├── src/
│   ├── components/
│   │   └── AuraPlayer.jsx    # Main player component
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── postcss.config.js          # PostCSS configuration
```

## 🎯 Features Overview

### Navigation
- Sidebar with icon-based navigation
- Active state indicators
- Settings access

### Music Discovery
- Featured release hero section
- Top recommendations carousel
- Following artists with live status
- Continue playing queue

### Playback Controls
- Play/Pause toggle
- Track progress with time display
- Skip forward/backward
- Shuffle and repeat modes
- Volume control
- Queue and fullscreen options

### Design Elements
- Cyan (#81ecff) and purple (#a68cff) accents
- Dark mode optimized
- Gradient overlays
- Texture backgrounds
- Smooth hover animations

## 🛠️ Customization

### Colors
Edit the color scheme in `src/components/AuraPlayer.jsx`:
- Primary: `cyan-400` (#81ecff)
- Secondary: `orange-500` 
- Background: `#0a0e14`

### Content
Update albums, artists, and songs data in the component's state arrays.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by modern music streaming platforms
- Icons by [Lucide](https://lucide.dev/)
- Font: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

---

**Enjoy the music! 🎵**
