/**
 * Script to copy Vite build output to Next.js public folder
 * This allows serving the React frontend from Next.js
 */
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', '..', 'dist');
const targetDir = path.join(__dirname, '..', 'public', 'site');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory not found: ${src}`);
    return;
  }

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean target directory first
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}

console.log(`Copying frontend build from ${sourceDir} to ${targetDir}...`);
copyRecursive(sourceDir, targetDir);
console.log('Frontend copied successfully!');
