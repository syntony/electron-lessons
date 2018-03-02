const path = require('path');
const electron = require('electron');
const TrayIcon = require('./app/tray_icon');
const MainWindow = require('./app/main_window');

const { app, ipcMain } = electron;

let mainWindow;
//  for prevent tray icon dissapear because of JavaScript garbage collector
let tray;

app.on('ready', () => {
  //  causes errors on ubuntu
  //
  //  app.dock.hide();
  //
  //  mb should uncomment for non linux platforms

  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  const tooltip = 'Timer App';
  tray = new TrayIcon(iconPath, mainWindow, tooltip);
});

ipcMain.on('update-timer', (event, timeLeft) => {
  process.platform !== 'linux' ? tray.setTitle(timeLeft) : null;
});
