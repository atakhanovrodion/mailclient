import { ipcRenderer, remote } from "electron";
const net = remote.net;
export interface IAuthInfo {
  user: string;
  pass: string;
}

export class Worker {
  private static info: IAuthInfo;
  constructor(info: IAuthInfo) {
    Worker.info = info;
  }
  tryAuth(): void {
    ipcRenderer.send("test", Worker.info);
  }
}
