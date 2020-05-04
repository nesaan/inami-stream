import {app, BrowserWindow, Menu} from 'electron';

class ElectronProcess {
  constructor(){
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });
    this.window.loadFile('public/web/index.html');
  }
}

let electronProcess;

//Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  electronProcess = new ElectronProcess();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    electronProcess = new ElectronProcess();
  }
})