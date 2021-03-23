import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";
const createWindow = function (): void {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("index.html");
};

app.on("ready", createWindow);
