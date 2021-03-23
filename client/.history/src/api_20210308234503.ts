import axios, { AxiosResponse } from "axios";

export interface IAuthInfo {
  host: string;
  port: number;
  user: string;
  password: string;
}
export interface IMailbox {
  name: string;
  path: string;
}
export interface IMessage {
  id: string;
  from: string;
  subject: string;
  date: string;
  body?: string;
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
  public async listOfMailboxes(): Promise<IMailbox[]> {
    const response: AxiosResponse = await axios.get(
      "http://localhost:3001/mailboxes"
    );
    return response.data;
  }
  public async getMailbox(mailbox: string): Promise<IMessage[]> {
    const response: AxiosResponse = await axios.get(
      `http://localhost:3001/mailboxes/${mailbox}`
    );
    return response.data;
  }
}
