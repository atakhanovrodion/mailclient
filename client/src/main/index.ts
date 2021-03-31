/* eslint-disable */
import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

let mainWindow: BrowserWindow | null;

const createWindow = function (): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL("http://localhost:9000");
};

app.on("ready", createWindow);
