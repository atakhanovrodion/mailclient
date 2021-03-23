import { app, BrowserWindow } from "electron";

const createWindow = function (): void {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
};
