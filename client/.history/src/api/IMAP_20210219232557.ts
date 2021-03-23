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
    const request = net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: 3001,
      path: "/auth",
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
    });
    request.setHeader("Content-Type", "application/json");
    request.end();
    ipcRenderer.send("test", Worker.info);
  }
}
