import express, { Express, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { LocalInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
const app: Express = express();

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
    const serverInfo: IMAP.IServerInfo = JSON.parse(
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
    const serverInfo: IMAP.IServerInfo = {
      host: req.body.host,
      port: req.body.port,
      auth: { user: req.body.user, pass: req.body.password },
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
    const serverInfo: IMAP.IServerInfo = JSON.parse(
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
app.get("/mailboxes/:mailbox/:id", (req: Request, res: Response) => {
  console.log(`GET /mailboxes/${req.params.mailbox}/${req.params.id} `);
  try {
    const serverInfo: IMAP.IServerInfo = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "serverinfo.json")).toString()
    );
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messageBody: string | undefined = imapWorker.getMessageBody({
      mailbox: req.params.mailbox,
      id: parseInt(req.params.id, 10),
    });
  } catch (err) {
    console.log("error", err);
    res.send("error");
  }
});

app.listen(LocalInfo.port, () => {
  "Server on";
});
