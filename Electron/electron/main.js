const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1200,
    minWidth: 960,
    height: 720,
    minHeight: 540,
    // 隐藏边框
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  win.loadFile('./dist/index.html');
  // win.webContents.openDevTools();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('mini', function () {
  win.minimize();
});
ipcMain.on('max', function () {
  win.isMaximized() ? win.unmaximize() : win.maximize();
});
ipcMain.on('close', function () {
  process.exit();
});
