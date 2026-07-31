# WebSphere - Website Marketplace & Sales Platform

WebSphere is a modern, high-converting marketplace application for selling ready-to-use website templates and custom web builds.

## 🎨 Color Palette & Aesthetics
- **Theme**: Pastel Blue & Obsidian Black
- **Primary Pastel Blues**: `#A0C4FF`, `#38BDF8`, `#B9D6F2`, `#D4E6FE`
- **Obsidian Black Surfaces**: `#070A0F`, `#0E1420`, `#141C2E`
- **Glassmorphism**: Backdrop blur with glowing ice-blue borders

## 💳 3 Payment Options
1. **Credit / Debit Card**: Stripe 256-bit secure gateway simulation
2. **PayPal & Apple Pay**: 1-Click express checkout
3. **Cryptocurrency (USDT / ETH)**: Web3 wallet transfer with 5% discount

## 👤 Individual Account System
- Sign In & Register tabs with persistent `localStorage` session state
- Account Dashboard displaying purchased website templates, commercial license keys, and downloadable source code ZIP bundles.

## 🚀 GitHub & Vercel Deployment

To push this codebase to your GitHub account and deploy live to Vercel:

1. **Agree to Xcode license (macOS only)**:
   ```bash
   sudo xcodebuild -license
   ```

2. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial WebSphere launch"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Deploy to Vercel**:
   ```bash
   npx --yes vercel
   ```

   Or run our interactive deployment helper script:
   ```bash
   ./deploy.sh
   ```

## 🛠 Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS v4 + Glassmorphism Custom Utilities
- **Icons**: Lucide React
- **Animations**: Canvas Confetti
