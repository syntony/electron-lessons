//--- CROSSPLATFORM TRAY ICON
const electron = require('electron');
const { Tray, Menu } = electron;

class TrayIcon extends Tray {
  constructor(iconPath, appWindow, Tooltip) {
    //  Extends from Tray
    super(iconPath);
    
    //  Set app window
    this.appWindow = appWindow;
    //  Set tooltip
    this.setToolTip(Tooltip);

    //  Window height and width
    this.windowHeight = this.appWindow.getBounds().height;
    this.windowWidth = this.appWindow.getBounds().width;

    //  Crossplatform context menu items settings
    this.contextMenuItems = process.platform !== 'linux'
      ? Menu.buildFromTemplate([
        { role: 'quit' }
      ])
      : Menu.buildFromTemplate([
          {
            label: 'Show',
            click: () => {
              this.appWindow.setBounds({
                x: electron.screen.getPrimaryDisplay().size.width - this.windowWidth,
                y: 0,
                height: this.windowHeight,
                width: this.windowWidth
              })
              this.appWindow.show();
            }
          },
          {
            label: 'Hide',
             click: () => {
              this.appWindow.restore();
              this.appWindow.hide();
            }
          },
          { role: 'minimize' },
          { role: 'quit' }
      ]);

    //  Based on linux difference among other systems
    if (process.platform !== 'linux') {
      this.on('click', this.onClick.bind(this));
      this.on('right-click', this.onRightClick.bind(this));
    } else {
      //  Linux tray icons works only with context menu
      this.setContextMenu(this.contextMenuItems);
    }
  }

  onClick(event, bounds) {
    //  Click event bounds
    const { x, y } = bounds;

    if (this.appWindow.isVisble()) {
       this.appWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - this.windowHeight;

      this.appWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height: this.windowHeight,
        width: this.windowWidth
      })
       this.appWindow.show();
    }
  }

  onRightClick() {
    this.setContextMenu(this.contextMenuItems);
  }
}

module.exports = TrayIcon;
