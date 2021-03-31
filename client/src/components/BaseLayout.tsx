/* eslint-disable */

import * as React from "react";
import Login from "./Login";
import * as api from "../api";
import Header from "./Header";
import ListOfMailboxes from "./ListOfMailboxes";
import ListOfMessages from "./ListOfMessages";
import WaitView from "./WaitView";
import MessageView from "./MessageView";

type MyState = {
  isAuth: boolean;
  loginEmail: string;
  loginPassword: string;
  currentEmail: string;
  currentPassword: string;
  listOfMailboxes: api.IMailbox[];
  listOfMessages: api.IMessage[];
  currentHost: string;
  currentMailboxList: [];
  currentMessageBody: string;
  currentMailbox: string;
  errorText: string;
  waitState: boolean;
  viewState: string;
  date: string;
  from: string;
  subject: string;
  isErr: boolean;
};

class BaseLayout extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.tryAuth = this.tryAuth.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getMailbox = this.getMailbox.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.changeView = this.changeView.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.errHandler = this.errHandler.bind(this);
    this.state = {
      isAuth: false,
      loginEmail: "kekwtest66@yandex.ru",
      loginPassword: "imap1488",
      currentEmail: "undefined",
      currentHost: "",
      currentMailboxList: [],
      currentMessageBody: "",
      currentMailbox: "INBOX",
      currentPassword: "",
      listOfMailboxes: [],
      listOfMessages: [],
      errorText: "",
      waitState: false,
      viewState: "list",
      date: "",
      from: "",
      subject: "",
      isErr: false,
    };
  }

  render() {
    return (
      <div>
        <Login
          onSubmit={this.tryAuth}
          onChange={this.handleInput}
          isOpen={this.state.isAuth}
          user={this.state.loginEmail}
          pass={this.state.loginPassword}
          errorText={this.state.errorText}
        />
        <WaitView state={this.state.waitState} />

        <div className="appContainer">
          <div className="header">
            <Header
              onClick={this.signOut}
              currentEmail={this.state.currentEmail}
              isAuth={this.state.isAuth}
              changeView={this.changeView}
            />
          </div>
          <div className="listOfMailboxes">
            <ListOfMailboxes
              mailboxes={this.state.listOfMailboxes}
              onClick={this.getMailbox}
              mailbox={this.state.currentMailbox}
            />
          </div>
          <div className="centerArea">
            {this.state.viewState === "list" ? (
              <ListOfMessages
                messages={this.state.listOfMessages}
                onClick={this.getMessage}
              />
            ) : (
              <MessageView
                viewState={this.state.viewState}
                messageText={this.state.currentMessageBody}
                date={this.state.date}
                from={this.state.from}
                subject={this.state.subject}
                onClick={this.getMailbox}
                mailbox={this.state.currentMailbox}
                onChange={this.handleInput}
                sendMessage={this.sendMessage}
                isErr={this.state.isErr}
                errHandler={this.errHandler}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  handleInput(e: any): void {
    const target: string = e.target.id;

    if (
      target ===
      ("currentMessageBody" ||
        "currentPassword" ||
        "currentEmail" ||
        "from" ||
        "subject")
    )
      this.setState({ [target]: e.target.value });
  }

  async tryAuth(): Promise<void> {
    const domain: string = findDomain(this.state.loginEmail);
    const info: api.IAuthInfo = {
      user: this.state.loginEmail,
      password: this.state.loginPassword,
      host: `imap.${domain}`,
      hostsmtp: `smtp.${domain}`,
      port: 993,
    };
    this.setState({
      waitState: true,
    });
    if ((await api.Worker.tryAuth(info)) === "succes") {
      const data = {
        loginEmail: "",
        loginPassword: "",
        isAuth: true,
        currentEmail: this.state.loginEmail,
        currentPassword: this.state.loginPassword,
        currentHost: domain,
      };
      this.setState(data);
      console.log(this.state);
      this.getListOfMailboxes();
      // TODO
      this.getMailbox("INBOx");
    } else {
      this.setState({
        errorText: "err",
        waitState: false,
      });
    }
    this.setState({ loginEmail: "", loginPassword: "" });
  }

  async getListOfMailboxes(): Promise<void> {
    this.setState({
      waitState: true,
    });
    const mailboxes = await api.Worker.listOfMailboxes();
    this.setState({ listOfMailboxes: mailboxes });
  }

  async getMailbox(path: string): Promise<void> {
    this.setState({
      waitState: true,
    });
    const messages: api.IMessage[] = await api.Worker.getMailbox(path);
    this.setState({
      listOfMessages: messages,
      currentMailbox: path,
      waitState: false,
      currentMessageBody: "",
      viewState: "list",
    });
    console.log(this.state);
  }

  async getMessage(message: api.IMessage): Promise<void> {
    this.setState({
      waitState: true,
    });
    const messageBody: string = await api.Worker.getMessage(
      this.state.currentMailbox,
      message.id.toString()
    );
    console.log(message.date);
    this.setState({
      currentMessageBody: messageBody,
      waitState: false,
      viewState: "view",
      date: message.date,
      from: message.from,
      subject: message.subject,
    });
  }

  async sendMessage(): Promise<void> {
    this.setState({ waitState: true });
    if (
      (await api.Worker.sendMessage(
        this.state.from,
        this.state.currentEmail,
        this.state.subject,
        this.state.currentMessageBody
      )) === "ok"
    ) {
      console.log("suc");
      this.setState({
        waitState: false,
        from: "",
        subject: "",
        currentMessageBody: "",
      });
    } else {
      console.log("fail");
      this.setState({ waitState: false, isErr: true });
    }
  }

  changeView(): void {
    this.setState({
      viewState: "new",
      from: "",
      subject: "",
      currentMessageBody: "",
    });
  }

  signOut(): void {
    this.setState({
      isAuth: false,
      listOfMailboxes: [],
      listOfMessages: [],
      errorText: "",
      viewState: "list",
    });
  }

  errHandler() {
    this.setState({
      isErr: false,
    });
  }
}
export default BaseLayout;

// TODO
// email validation
function findDomain(address: string): string {
  let i = 0;
  let domain = "";
  while (i < address.length) {
    if (address[i] === "@") {
      if (address[i + 1]) {
        let j = i + 1;
        while (j < address.length) {
          domain += address[j];
          j++;
        }
      }
    }
    i++;
  }
  return domain;
}
