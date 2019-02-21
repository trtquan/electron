console.log('renderer process Admin');

const {BrowserWindow} = require('electron').remote;
const {ipcRenderer} = require('electron');
const path = require('path')
const url = require('url')

const newWindowBtn = document.getElementById('newWindowBtn');
const errorBtn = document.getElementById('errorBtn');
const asyncBtn = document.getElementById('asyncBtn');
const syncBtn = document.getElementById('syncBtn');
const ul = document.querySelector('ul');

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
  // winNote.webContents.openDevTools();
});


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

ipcRenderer.on('note:add', function(e, item){
  const li = document.createElement('li');
  const itemText = document.createTextNode(item);
  li.appendChild(itemText);
  ul.appendChild(li);
});

ipcRenderer.on('note:clear', function() {
  ul.className = '';
  ul.innerHTML = '';
});

asyncBtn.addEventListener('click', function(){
  console.log('async msg 1')
  ipcRenderer.send('async-message');
  console.log('async msg 2')
  
});

ipcRenderer.on('async-message-reply', function (event, arg) {
const message = `Message reply: ${arg}`
console.log(message);
});

syncBtn.addEventListener('click', function(){
  console.log('sync msg 1')
  const reply = ipcRenderer.sendSync('sync-message');
  console.log(reply);
  console.log('sync msg 2')
  
})

ul.addEventListener('dblclick', removeItem);

function removeItem(e){
  event.target.remove();
  if(ul.children.length == 0){
    ul.className = '';
  }
}
