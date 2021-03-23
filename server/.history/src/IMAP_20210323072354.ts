const ImapClient = require("emailjs-imap-client");
import { simpleParser, ParsedMail } from "mailparser";
import { IServerInfo } from "./ServerInfo";
export interface ICallOptions {
  mailbox: string;
  id?: number;
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
  public async getMailbox(callOptions: ICallOptions): Promise<IMessage[]> {
    console.log("IMAP.Worker.listMessages()", callOptions);
    const client: any = await this.connectToServer();
    const mailbox: any = await client.selectMailbox(callOptions.mailbox);
    console.log(
      `IMAP.Worker.listMessages(): Message count = ${mailbox.exists}`
    );
    if (mailbox.exists === 0) {
      await client.close();
      return [];
    }
    const messages: any[] = await client.listMessages(
      callOptions.mailbox,
      "1:*",
      ["uid", "envelope"]
    );
    await client.close();
    const finalMessages: IMessage[] = [];
    messages.forEach((value: any) => {
      finalMessages.push({
        id: value.uid,
        date: value.envelope.date,
        from: value.envelope.from[0].address,
        subject: value.envelope.subject,
      });
    });
    return finalMessages;
  }
  public async getMessageBody(
    callOptions: ICallOptions
  ): Promise<string | undefined> {
    const client: any = await this.connectToServer();
    const messages: any[] = await client.listMessages(
      callOptions.mailbox,
      callOptions.id,
      ["body[]"],
      { byUid: true }
    );
    const parsed: ParsedMail = await simpleParser(messages[0]["body[]"]);
    await client.close();
    return parsed.text;
  }
  public async deleteMessage(callOptions: ICallOptions): Promise<void> {
    const client: any = await this.connectToServer();
    await client.deleteMessages(callOptions.mailbox, callOptions.id, {
      byUid: true,
    });
    await client.close();
  }
}
