const electron = require('electron');
const { session, app, BrowserWindow } = electron
const ipc = electron.ipcMain
const fetch = require('electron-fetch').default
let win

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('pages/index.html')

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
})

ipc.on('login_success', function (event, file) {
  win.loadFile('pages/billing.html');
  win.webContents.on('did-finish-load', () => {
		win.webContents.send('get-sessoin', file);
	});
});