const path = require('path');
const electron = require('electron');
const TrayIcon = require('./app/tray_icon');

const { app, BrowserWindow } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  
  const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TrayIcon(iconPath, mainWindow);
})
