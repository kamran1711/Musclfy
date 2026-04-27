import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();

// Move frontend files
const frontendDir = path.join(rootDir, 'frontend');
if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir);
const frontendFiles = ['src', 'public', 'index.html', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js', '.eslintrc.cjs'];
frontendFiles.forEach(file => {
  if (fs.existsSync(path.join(rootDir, file))) {
    fs.renameSync(path.join(rootDir, file), path.join(frontendDir, file));
  }
});

// Move backend files
const backendDir = path.join(rootDir, 'backend');
if (!fs.existsSync(backendDir)) fs.mkdirSync(backendDir);
const backendFiles = ['server.js', 'controllers', 'models', 'routes', 'uploads', 'bollywood.json', 'tumhiho.json', 'jamendo_test.json', 'itunes_test.json', 'test.mp3', 'sahibha.jpg'];
backendFiles.forEach(file => {
  if (fs.existsSync(path.join(rootDir, file))) {
    fs.renameSync(path.join(rootDir, file), path.join(backendDir, file));
  }
});

// Parse package.json
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const frontendPkg = {
  name: "aura-player-frontend",
  version: "1.0.0",
  private: true,
  type: "module",
  scripts: {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  dependencies: {
    "lucide-react": pkg.dependencies["lucide-react"],
    "react": pkg.dependencies["react"],
    "react-dom": pkg.dependencies["react-dom"],
    "react-router-dom": pkg.dependencies["react-router-dom"]
  },
  devDependencies: pkg.devDependencies
};

const backendPkg = {
  name: "aura-player-backend",
  version: "1.0.0",
  private: true,
  type: "module",
  scripts: {
    "start": "node server.js",
    "server": "node server.js"
  },
  dependencies: {
    "cors": pkg.dependencies["cors"],
    "express": pkg.dependencies["express"],
    "mongoose": pkg.dependencies["mongoose"],
    "multer": pkg.dependencies["multer"]
  }
};

fs.writeFileSync(path.join(frontendDir, 'package.json'), JSON.stringify(frontendPkg, null, 2));
fs.writeFileSync(path.join(backendDir, 'package.json'), JSON.stringify(backendPkg, null, 2));

// Overwrite root package.json for convenience
const rootPkg = {
  name: "aura-player-root",
  version: "1.0.0",
  private: true,
  scripts: {
    "start": "npm run server --prefix backend & npm run dev --prefix frontend",
    "install:all": "npm install --prefix frontend && npm install --prefix backend"
  }
};
fs.writeFileSync(pkgPath, JSON.stringify(rootPkg, null, 2));

console.log("Restructuring complete. Try running npm run install:all to install modules cleanly.");
