import * as React from "react";
import Login from "./Login";
import * as api from "../api";
import Header from "./Header";
import ListOfMailboxes from "./ListOfMailboxes";
import ListOfMessages from "./ListOfMessages";
import WaitView from "./WaitView";
import MessageView from "./MessageView";
import findDomain from "./helper";

type MyState = {
  isAuth: boolean;
  loginEmail: string;
  loginPassword: string;
  currentEmail: string;
  listOfMailboxes: api.IMailbox[];
  listOfMessages: api.IMessage[];
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
      currentMessageBody: "",
      currentMailbox: "INBOX",
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
  }

  async getMessage(message: api.IMessage): Promise<void> {
    this.setState({
      waitState: true,
    });
    const { currentMailbox } = this.state;
    const messageBody: string = await api.Worker.getMessage(
      currentMailbox,
      message.id.toString()
    );
    this.setState({
      currentMessageBody: messageBody,
      waitState: false,
      viewState: "view",
      date: message.date,
      from: message.from,
      subject: message.subject,
    });
  }

  async tryAuth(): Promise<void> {
    const { loginEmail, loginPassword } = this.state;
    const domain: string = findDomain(loginEmail);
    const info: api.IAuthInfo = {
      user: loginEmail,
      password: loginPassword,
      host: `imap.${domain}`,
      hostsmtp: `smtp.${domain}`,
      port: 993,
    };
    this.setState({
      waitState: true,
    });
    if ((await api.Worker.tryAuth(info)) === "succes") {
      this.setState({
        loginEmail: "",
        loginPassword: "",
        isAuth: true,
        currentEmail: loginEmail,
      });
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

  async sendMessage(): Promise<void> {
    this.setState({ waitState: true });
    const { from, currentEmail, subject, currentMessageBody } = this.state;
    if (
      (await api.Worker.sendMessage(
        from,
        currentEmail,
        subject,
        currentMessageBody
      )) === "ok"
    ) {
      this.setState({
        waitState: false,
        from: "",
        subject: "",
        currentMessageBody: "",
      });
    } else {
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

  render() {
    const {
      isAuth,
      loginEmail,
      loginPassword,
      errorText,
      waitState,
      currentEmail,
      listOfMailboxes,
      currentMailbox,
      listOfMessages,
      viewState,
      currentMessageBody,
      date,
      from,
      subject,
      isErr,
    } = this.state;
    return (
      <div>
        <Login
          onSubmit={this.tryAuth}
          onChange={this.handleInput}
          isOpen={isAuth}
          user={loginEmail}
          pass={loginPassword}
          errorText={errorText}
        />
        <WaitView state={waitState} />

        <div className="appContainer">
          <div className="header">
            <Header
              onClick={this.signOut}
              currentEmail={currentEmail}
              isAuth={isAuth}
              changeView={this.changeView}
            />
          </div>
          <div className="listOfMailboxes">
            <ListOfMailboxes
              mailboxes={listOfMailboxes}
              onClick={this.getMailbox}
              mailbox={currentMailbox}
            />
          </div>
          <div className="centerArea">
            {viewState === "list" ? (
              <ListOfMessages
                messages={listOfMessages}
                onClick={this.getMessage}
              />
            ) : (
              <MessageView
                viewState={viewState}
                messageText={currentMessageBody}
                date={date}
                from={from}
                subject={subject}
                onClick={this.getMailbox}
                mailbox={currentMailbox}
                onChange={this.handleInput}
                sendMessage={this.sendMessage}
                isErr={isErr}
                errHandler={this.errHandler}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default BaseLayout;
