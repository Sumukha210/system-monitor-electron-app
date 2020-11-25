const path = require("path");
const { app, BrowserWindow } = require("electron");
const os = require("os-utils");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./monitor.png",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile(path.join(__dirname, "index.html"));
  //   win.webContents.openDevTools();

  setInterval(() => {
    os.cpuUsage(per => {
      win.webContents.send("sys__info", {
        memory: os.freememPercentage() * 100,
        cpu: per * 100,
        tot_memory: os.totalmem() / 1024,
      });
    });
  }, 1000);

  win.on("closed", () => (win = null));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
