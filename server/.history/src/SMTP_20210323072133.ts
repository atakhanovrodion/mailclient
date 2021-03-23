import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import { IServerInfo } from "./ServerInfo";
export class Worker {
  private static serverInfo: IServerInfo;
  constructor(serverInfo: IServerInfo) {
    console.log("SMTP.Worker.constructor", serverInfo);
    Worker.serverInfo = serverInfo;
  }
  public sendMail(options: SendMailOptions): Promise<string> {
    return new Promise((res, rej) => {
      const transport: Mail = nodemailer.createTransport(Worker.serverInfo);
      transport.sendMail(
        options,
        (inError: Error | null, inInfo: SentMessageInfo) => {
          if (inError) {
            console.log("SMTP.Worker.sendMessage(): Error", inError);
            rej(inError);
          } else {
            console.log("SMTP.Worker.sendMessage(): Ok", inInfo);
            res("ok");
          }
        }
      );
    });
  }
}
