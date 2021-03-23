import axios, { AxiosResponse } from "axios";

export interface IAuthInfo {
  host: string;
  hostsmtp: string;
  port: number;
  user: string;
  password: string;
}
export interface IMailbox {
  name: string;
  path: string;
}
export interface IMessage {
  id: number;
  from: string;
  subject: string;
  date: string;
  body?: string;
}

export class Worker {
  public async tryAuth(info: IAuthInfo): Promise<string> {
    const response: AxiosResponse = await axios.post(
      "http://localhost:3001/auth",
      info
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
  public async getMessage(mailbox: string, id: string): Promise<string> {
    const response: AxiosResponse = await axios.get(
      `http://localhost:3001/mailboxes/${mailbox}/${id}`
    );
    return response.data;
  }
  public async sendMessage(
    to: string,
    from: string,
    subject: string,
    message: string
  ): Promise<string> {
    const response: AxiosResponse = await axios.post(
      "http://localhost:3001/message",
      { to: to, from: from, subject: subject, text: message }
    );
    return response.data;
  }
}