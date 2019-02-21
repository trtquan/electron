const { app, BrowserWindow, dialog, ipcMain, Menu } = require("electron");
const path = require('path')
const url = require('url')

console.log('Main process');
let winAdmin, winClient;

function createWindow() {

  winAdmin = new BrowserWindow({
    width: 800,
    height: 600,
  })

  winAdmin.loadURL(url.format({
    pathname: path.join(__dirname, 'admin.html'),
    protocol: 'file:',
    slashes: true
  }));

  winAdmin.on('closed', () => {
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

//  IPC demo
showErrorMess = (event) => {
  dialog.showErrorBox('An Error Message', 'Demo');
  event.sender.send('opend-error-dialog', 'The error dialog is opend')
};

ipcMain.on('open-error-dialog', showErrorMess);

// Catch note:add
ipcMain.on('note:add', (e, item) => {
  winAdmin.webContents.send('note:add', item);
});

ipcMain.on('async-message', (event, arg) => {
  event.sender.send('async-message-reply', 'Main process async reply.');
});

ipcMain.on('sync-message', (event, arg) => {
  event.returnValue = 'sync-reply';
});