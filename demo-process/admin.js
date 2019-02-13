console.log('renderer process Admin');

const {BrowserWindow} = require('electron').remote;
const {ipcRenderer} = require('electron');
const path = require('path')
const url = require('url')

const newWindowBtn = document.getElementById('newWindowBtn');

newWindowBtn.addEventListener('click', (event) => {

  let winNote = new BrowserWindow({
    width: 600,
    height: 400
  });
  winNote.loadURL(url.format({
    pathname: path.join(__dirname, 'note.html'),
    protocol: 'file:',
    slashes: true
  }));
  winNote.webContents.openDevTools();
});

const errorBtn = document.getElementById('errorBtn');

const sendErrorToMain = () => {
  console.log('async msg 1')
  ipcRenderer.send('open-error-dialog')
  console.log('async msg 2')
}
errorBtn.addEventListener('click', sendErrorToMain);

const errorShown = (event, arg) => {
  const pTag = document.getElementById('errorShown');
  pTag.textContent = arg;
}
ipcRenderer.on('opend-error-dialog', errorShown);

let winNote = new BrowserWindow({
  width: 600,
  height: 400
});
winNote.loadURL(url.format({
  pathname: path.join(__dirname, 'note.html'),
  protocol: 'file:',
  slashes: true
}));