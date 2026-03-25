# 🕷️ Velamala Rahul — Spider-Man Portfolio

## Setup Instructions

### 1. Add Your Photo
- Place your photo file at: `assets/photo.jpg` (or .png)
- Update `index.html` line where the photo placeholder is — replace the SVG block with:
  ```html
  <img src="assets/photo.jpg" alt="Rahul Velamala" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
  ```

### 2. Add Your Resume PDF
- Copy your resume PDF into the `assets/` folder
- Name it: `Rahul_Velamala_CV.pdf`
- The preview and download buttons will automatically work

### 3. Add Certificate PDFs
- Copy your certificate files into the `assets/` folder with these names:
  - `no-code-tools.pdf`
  - `dsa-training.pdf`
  - `master-c.pdf`
  - `hardware-os.pdf`
  - `network-communication.pdf`
- To make them open in the modal, update the `openCertModal` function in `script.js` to embed them as iframes

### 4. Deploy
- Open `index.html` in any browser — no build step needed
- Or upload the folder to GitHub Pages, Netlify, or Vercel

---

## File Structure
```
rahul_portfolio/
├── index.html          ← Main portfolio page
├── style.css           ← Spider-Man themed styles
├── script.js           ← Animations, cursor, canvas
├── assets/
│   ├── photo.jpg       ← YOUR PHOTO (add this)
│   └── Rahul_Velamala_CV.pdf ← YOUR RESUME (add this)
└── README.md
```

## Features
- 🕷️ Spider-Man red/blue color scheme
- ✨ Crystal star background with animated sparkles
- 🕸️ Spider web overlay canvas
- 🖱️ Custom red cursor with smooth ring follow
- ⌨️ Typed text hero animation
- 📜 Resume preview panel with zoom controls
- 🏆 Certificate cards with modal view
- 📊 Animated skill progress bars
- 🎬 Scroll-triggered fade-in animations
- 📱 Fully responsive mobile design
