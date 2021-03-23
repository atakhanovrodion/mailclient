const electron = require("electron");
const net = electron.remote.net;
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
    const body = JSON.stringify(Worker.info);
    const request = net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: 3001,
      path: "/auth",
    });
    request.on("response", (response) => {
      console.log(`STATUS: ${response.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    });
    request.on("finish", () => {
      console.log("Request is Finished");
    });
    request.on("abort", () => {
      console.log("Request is Aborted");
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
    });
    request.setHeader("Content-Type", "application/json");
    request.write(body, "utf-8");
    request.end();
    ipcRenderer.send("test", Worker.info);
  }
}