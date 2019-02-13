const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require('path')
const url = require('url')

console.log('Main process');
let winAdmin, winClient;

function createWindow() {

  winAdmin = new BrowserWindow({
    width: 800,
    height: 600,
  })
  winClient = new BrowserWindow({
    width: 800,
    height: 600,
  })

  winAdmin.loadURL(url.format({
    pathname: path.join(__dirname, 'admin.html'),
    protocol: 'file:',
    slashes: true
  }));
  winClient.loadURL(url.format({
    pathname: path.join(__dirname, 'client.html'),
    protocol: 'file:',
    slashes: true
  }));

  winAdmin.webContents.openDevTools();
  winClient.webContents.openDevTools();


  winAdmin.on('closed', () => {
    winAdmin = null
  });
  winClient.on('closed', () => {
    winAdmin = null
  });
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

showErrorMess = (event) => {
  dialog.showErrorBox('An Error Message', 'Demo');
  event.sender.send('opend-error-dialog', 'The error dialog is opend')
};

ipcMain.on('open-error-dialog', showErrorMess);