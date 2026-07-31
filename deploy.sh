#!/bin/bash

# WebSphere Deployment Script for GitHub & Vercel
# Target Repository: https://github.com/sokoni/ash-website.git

echo "=========================================="
echo "🚀 WebSphere GitHub & Vercel Deployer"
echo "=========================================="

echo "Step 1: Initializing Git and committing project files..."
git init
git add .
git commit -m "Initial release of WebSphere website selling platform"
git branch -M main

echo "Step 2: Connecting remote repository: https://github.com/sokoni/ash-website.git"
git remote remove origin 2>/dev/null
git remote add origin https://github.com/sokoni/ash-website.git
git push -u origin main

echo "=========================================="
echo "✅ Git push complete!"
echo "=========================================="

echo "Step 3: Deploying live to Vercel..."
npx --yes vercel

echo "=========================================="
echo "✨ All done! Your site is live!"
echo "=========================================="
