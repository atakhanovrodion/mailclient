import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import url from "url";

let mainWindow: Electron.BrowserWindow | null;

const createWindow = function (): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL("http://localhost:9000");
};

app.on("ready", createWindow);
console.log("ss");
ipcMain.on("test", (arg) => {
  console.log("g");
});
