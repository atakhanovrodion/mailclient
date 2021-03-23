import express, { Express, Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { LocalInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
const app: Express = express();
let currentServerInfo = {
  host: "imap.mail.ru",
  port: 993,
  auth: { user: "smtptest66@mail.ru", pass: "imap1488" },
};

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

app.get("/");
app.post("/mailboxes", async (req: Request, res: Response) => {
  console.log("POST /mailboxes ", req.body);
  try {
    const serverInfo: IMAP.IServerInfo = {
      host: req.body.host,
      port: req.body.port,
      auth: { user: req.body.user, pass: req.body.password },
    };
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
      () => {
        console.log("test");
      }
    );
    //
    currentServerInfo = serverInfo;
    res.send("succes");
  } catch (err) {
    console.log("error", err);
    res.send("error");
  }
});
app.post("/maiboxes/:mailbox", async (req: Request, res: Response) => {
  console.log("POST /auth s", req.body);
  try {
    const serverInfo: IMAP.IServerInfo = {
      host: req.body.host,
      port: req.body.port,
      auth: { user: req.body.user, pass: req.body.password },
    };
    const imapWorker = new IMAP.Worker(serverInfo);
    await imapWorker.Auth();
    currentServerInfo = serverInfo;
    res.send("succes");
  } catch (err) {
    console.log("error", err);
    res.send("error");
  }
});
app.listen(LocalInfo.port, () => {
  "Server on";
});
