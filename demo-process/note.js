const {
    ipcRenderer
} = require('electron');

console.log('Render process note');

const submitForm = (e) => {
    e.preventDefault();
    const note = document.querySelector('#item').value;
    console.log(ipcRenderer);
    ipcRenderer.send('note:add', note);
}

document.querySelector('form').addEventListener('submit', submitForm);