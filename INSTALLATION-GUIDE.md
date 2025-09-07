# M&P Checker - Installation Guide

## 🚨 Node.js Not Found Error

You're seeing this error because Node.js (which includes npm) is not installed on your system.

## 📥 Quick Installation Steps

### 1. Download Node.js
- Visit: **https://nodejs.org/**
- Click the **LTS** button (Long Term Support version)
- Download the Windows installer (.msi file)

### 2. Install Node.js
- Run the downloaded installer
- ✅ **Important:** Make sure "Add to PATH" is checked
- Accept all default settings
- Complete the installation

### 3. Restart Your Computer
- This ensures the PATH environment variable is updated
- Close all terminal windows before restarting

### 4. Verify Installation
After restart, open PowerShell and run:
```powershell
node --version
npm --version
```

Both commands should return version numbers.

### 5. Install Project Dependencies
```powershell
npm run install-all
```

### 6. Start Development Servers
```powershell
npm run dev
```

## 🔧 Alternative Installation Methods

### Using Chocolatey (if installed)
```powershell
choco install nodejs
```

### Using Winget (Windows Package Manager)
```powershell
winget install OpenJS.NodeJS
```

## ❓ Troubleshooting

**If Node.js still isn't recognized after installation:**

1. **Check PATH manually:**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Click "Environment Variables"
   - Under "System variables", find "Path" and click "Edit"
   - Look for `C:\Program Files\nodejs\`
   - If missing, add it manually

2. **Restart PowerShell as Administrator:**
   - Right-click PowerShell → "Run as administrator"

3. **Check installation location:**
   - Look for Node.js in `C:\Program Files\nodejs\`
   - If it's there, add this path to your PATH variable

## 🎯 What You'll Get

After successful installation:
- **Node.js**: JavaScript runtime for the backend
- **npm**: Package manager for installing dependencies
- **npx**: Tool for running packages (comes with npm)

## 📞 Need Help?

If you continue having issues:
1. Check the official Node.js documentation
2. Verify your Windows version compatibility
3. Try installing as Administrator
4. Check Windows Defender/Antivirus isn't blocking the installation

---

**Next Steps:** Once Node.js is installed, you can proceed with setting up the M&P Checker project!
