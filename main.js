const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const fs = require('fs');
const path = require('path');
let win;
const filters = [{ name: 'MCQ deck', extensions: ['mcqdeck'] }];
function create() {
  win = new BrowserWindow({ width: 1280, height: 800, backgroundColor: '#14171d',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true } });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
ipcMain.handle('save', async (e, { data, file, saveAs }) => {
  let f = file;
  if (!f || saveAs) {
    const r = await dialog.showSaveDialog(win, { defaultPath: 'my-deck.mcqdeck', filters });
    if (r.canceled) return null;
    f = r.filePath;
  }
  fs.writeFileSync(f, data, 'utf8');
  return f;
});
ipcMain.handle('open', async () => {
  const r = await dialog.showOpenDialog(win, { properties: ['openFile'], filters });
  if (r.canceled) return null;
  return { file: r.filePaths[0], data: fs.readFileSync(r.filePaths[0], 'utf8') };
});
