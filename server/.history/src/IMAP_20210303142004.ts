const ImapClient = require("emailjs-imap-client");

export interface IServerInfo {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}
export interface IMailbox {
  name: string;
  path: string;
}
export interface IMessage {
  id: string;
  date: string;
  from: string;
  subject: string;
  body?: string;
}

export class Worker {
  private static serverInfo: IServerInfo;
  constructor(serverInfo: IServerInfo) {
    Worker.serverInfo = serverInfo;
  }
  private async connectToServer(): Promise<any> {
    const client = new ImapClient.default(
      Worker.serverInfo.host,
      Worker.serverInfo.port,
      { auth: Worker.serverInfo.auth }
    );
    console.log(Worker.serverInfo);
    client.onerror = (err: Error) => {
      console.log("IMAP client Worker connection error", err);
    };
    await client.connect();
    return client;
  }
  public async Auth(): Promise<string> {
    const client: any = await this.connectToServer();
    await client.close();
    return "Succes";
  }
  public async getListOfMailboxes(): Promise<IMailbox[]> {
    const client: any = await this.connectToServer();
    const mailboxes: any = await client.listMailboxes();
    await client.close();
    const finalMailboxes: IMailbox[] = [];
    const iterateChildren: Function = (inArray: any[]): void => {
      inArray.forEach((inValue: any) => {
        finalMailboxes.push({
          name: inValue.name,
          path: inValue.path,
        });
        iterateChildren(inValue.children);
      });
    };
    iterateChildren(mailboxes.children);

    return finalMailboxes;
  }
  public async getMailbox(): Promise<IMessage[]> {}
}
