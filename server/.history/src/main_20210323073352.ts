import express, { Express, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { LocalInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
const app: Express = express();
import { IServerInfo } from "./ServerInfo";
app.use(express.json());
app.use(function (
  inRequest: Request,
  inResponse: Response,
  inNext: NextFunction
) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  inResponse.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  inNext();
});

app.get("/mailboxes", async (req: Request, res: Response) => {
  console.log("GET /mailboxes ");
  try {
    const serverInfo: IServerInfo = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "serverinfo.json")).toString()
    );
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const mailboxes: IMAP.IMailbox[] = await imapWorker.getListOfMailboxes();
    console.log("GET /mailboxes", mailboxes);
    res.json(mailboxes);
  } catch (err) {
    console.log("GET /mailboxes error", err);
    res.send(err);
  }
});
app.post("/auth", async (req: Request, res: Response) => {
  console.log("POST /auth s", req.body);
  try {
    const serverInfo: IServerInfo = {
      imap: {
        host: req.body.host,
        port: req.body.port,
        auth: { user: req.body.user, pass: req.body.password },
      },
      smtp: {
        host: req.body.host,
        port: req.body.port,
        auth: { user: req.body.user, pass: req.body.password },
      },
    };
    const imapWorker = new IMAP.Worker(serverInfo);
    await imapWorker.Auth();
    //
    fs.writeFile(
      path.join(__dirname, "..", "serverinfo.json"),
      JSON.stringify(serverInfo),
      (err) => {
        if (err) throw err;
        res.send("succes");
      }
    );
    //
  } catch (err) {
    console.log("error", err);
    res.send("error");
  }
});
app.get("/mailboxes/:mailbox", async (req: Request, res: Response) => {
  console.log(`GET /mailboxes/${req.params.mailbox} `);
  try {
    const serverInfo: IServerInfo = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "serverinfo.json")).toString()
    );
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messages: IMAP.IMessage[] = await imapWorker.getMailbox({
      mailbox: req.params.mailbox,
    });
    console.log("GET /mailboxes/:mailbox", messages);
    res.json(messages);
  } catch (err) {
    console.log("error", err);
    res.send("error");
  }
});
app.get("/mailboxes/:mailbox/:id", async (req: Request, res: Response) => {
  console.log(`GET /mailboxes/${req.params.mailbox}/${req.params.id} `);
  try {
    const serverInfo: IServerInfo = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "serverinfo.json")).toString()
    );
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messageBody: undefined | string = await imapWorker.getMessageBody({
      mailbox: req.params.mailbox,
      id: parseInt(req.params.id, 10),
    });
    console.log("/GET messageBody", messageBody);
    res.send(messageBody);
  } catch (err) {
    console.log("error", err);
    res.send("error");
  }
});
app.delete("/mailboxes/:mailbox/:id", async (req: Request, res: Response) => {
  console.log(`DELETE /mailboxes/${req.params.mailbox}/${req.params.id} `);
  try {
    const serverInfo: IServerInfo = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "serverinfo.json")).toString()
    );
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    await imapWorker.deleteMessage({
      mailbox: req.params.mailbox,
      id: parseInt(req.params.id, 10),
    });
    console.log("/DELETE");
    res.send("ok");
  } catch (err) {
    console.log("error:", err);
    res.send(err);
  }
});
app.post("/message", async (req: Request, res: Response) => {
  console.log("/POST message ", req.body);
  const serverInfo: IServerInfo = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "serverinfo.json")).toString()
  );
  ///FFFIIIXXX

  try {
    const smptWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
    await smptWorker.sendMail(req.body);
    res.send("ok");
  } catch (err) {
    console.log("POST /messages: Error", err);
    res.send("err");
  }
});

app.listen(LocalInfo.port, () => {
  console.log("Server on");
});
