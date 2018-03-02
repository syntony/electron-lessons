//--- CROSSPLATFORM TRAY ICON
const electron = require('electron');
const { Tray, Menu } = electron;

class TrayIcon extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    if (process.platform !== 'linux') {
      this.on('click', this.onClick.bind(this));
    } else {
      //  Window height and width
      const { height, width } = this.mainWindow.getBounds();

      const contextMenu = Menu.buildFromTemplate([
          {
            label: 'Show',
            click: () => {
              this.mainWindow.setBounds({
                x: electron.screen.getPrimaryDisplay().size.width - width,
                y: 0,
                height,
                width
              })
              this.mainWindow.show();
            }
          },
          {
            label: 'Hide',
             click: () => {
              this.mainWindow.restore();
              this.mainWindow.hide();
            }
          },
          {
            role: 'minimize'
          }
        ]);
        this.setToolTip('This is my electron application.');
        this.setContextMenu(contextMenu);
    }
  }

  onClick(event, bounds) {
    //  Click event bounds
    const { x, y } = bounds;

    //  Window height and width
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisble()) {
       this.mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;

      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width
      })
       this.mainWindow.show();
    }
  }
}

module.exports = TrayIcon;
