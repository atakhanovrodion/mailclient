const { net } = require("electron").remote;
export interface IAuthInfo {
  host: string;
  port: number;
  user: string;
  password: string;
}

export class Worker {
  private static info: IAuthInfo;
  constructor(info: IAuthInfo) {
    Worker.info = info;
  }
  // REturn Body chunk
  tryAuth(): void {
    const body = JSON.stringify(Worker.info);
    let res: string = "failure";
    const request = net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: 3001,
      path: "/auth",
    });
    request.on("response", (response: any) => {
      console.log(`STATUS: ${response.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

      response.on("data", (chunk: any) => {
        console.log(`BODY: ${chunk}`);
        res = chunk;
      });
    });
    request.on("finish", () => {
      console.log("Request is Finished");
    });
    request.on("abort", () => {
      console.log("Request is Aborted");
    });
    request.on("error", (error: any) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
    });
    request.setHeader("Content-Type", "application/json");
    request.write(body, "utf-8");
    request.end();
  }
}
