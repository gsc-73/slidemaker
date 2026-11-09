# MCQ Slide Maker (offline)

## Easiest: double-click build.bat
Install Node.js LTS once, then double-click `build.bat`. When it finishes, the Setup .exe is in the `dist` folder.

## Or step by step on Windows
1. Install Node.js LTS from https://nodejs.org (one time).
2. Unzip this folder. Open it, click the address bar, type `cmd`, press Enter.
3. `npm install`   (needs internet once; downloads Electron, equation engine and fonts)
4. `npm start`     (opens the app, to test)
5. `npm run build` (makes the installer: dist\MCQ Slide Maker Setup 0.1.0.exe)

If step 5 shows a "symbolic link" error, open Command Prompt as Administrator and run it again.
After installing from the .exe, the app works fully offline.

Save: Ctrl+S   Open: Ctrl+O   (decks are .mcqdeck files)

## Windows 7 support
This project uses Electron 22, the last version that runs on Windows 7 (needs Service Pack 1), 8, 10 and 11.
The installer contains both 64-bit and 32-bit versions and picks the right one automatically.
Build the .exe on a Windows 10/11 computer (or with GitHub Actions), then copy Setup.exe to the Windows 7 PCs.
Electron 22 gets no more security updates, so use this app for offline slides only.
