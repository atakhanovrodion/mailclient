import axios, { AxiosResponse } from "axios";

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

  public async tryAuth(): Promise<string> {
    const response: AxiosResponse = await axios.post(
      "http://localhost:3001/auth",
      Worker.info
    );
    return response.data;
  }
}
