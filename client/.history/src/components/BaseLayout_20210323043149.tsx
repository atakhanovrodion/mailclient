import * as React from "react";
import Login from "./Login";
import * as api from "../api";
import Header from "./Header";
import ListOfMailboxes from "./ListOfMailboxes";
import ListOfMessages from "./ListOfMessages";
import WaitView from "./WaitView";
import MessageView from "./MessageView";
type MyState = {
  isAuth: false;
  loginEmail: string;
  loginPassword: string;
  currenEmail: string;
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
  date: Date;
  from: string;
  subject: string;
};

class BaseLayout extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.tryAuth = this.tryAuth.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getMailbox = this.getMailbox.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }
  state: MyState = {
    isAuth: false,
    loginEmail: "kekwtest66@yandex.ru",
    loginPassword: "imap1488",
    currenEmail: "undefined",
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
    date: new Date(),
    from: "",
    subject: "",
  };
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
              currentEmail={this.state.currenEmail}
              isAuth={this.state.isAuth}
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
            {this.state.viewState == "list" ? (
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
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  handleInput(e: any): void {
    const target: string = e.target.id;
    this.setState({ [target]: e.target.value });
  }

  async tryAuth(): Promise<void> {
    let domain: string = findDomain(this.state.loginEmail);
    const info: api.IAuthInfo = {
      user: this.state.loginEmail,
      password: this.state.loginPassword,
      host: "imap." + domain,
      port: 993,
    };
    this.setState({
      waitState: true,
    });
    const apiWorker = new api.Worker();
    if ((await apiWorker.tryAuth(info)) == "succes") {
      const data = {
        loginEmail: "",
        loginPassword: "",
        isAuth: true,
        currenEmail: this.state.loginEmail,
        currentPassword: this.state.loginPassword,
        currentHost: domain,
      };
      this.setState(data);
      console.log(this.state);
      this.getListOfMailboxes();
      //TODO
      this.getMailbox("INBOx");
    } else {
      this.setState({
        errorText: "err",
      });
    }
    this.setState({ loginEmail: "", loginPassword: "", waitState: false });
  }

  async getListOfMailboxes(): Promise<void> {
    this.setState({
      waitState: true,
    });
    const apiWorker = new api.Worker();
    const mailboxes = await apiWorker.listOfMailboxes();
    this.setState({ listOfMailboxes: mailboxes, waitState: false });
  }

  async getMailbox(path: string): Promise<void> {
    this.setState({
      waitState: true,
    });
    const apiWorker: api.Worker = new api.Worker();
    const messages: api.IMessage[] = await apiWorker.getMailbox(path);
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
    const apiWorker: api.Worker = new api.Worker();
    const messageBody: string = await apiWorker.getMessage(
      this.state.currentMailbox,
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

  signOut(): void {
    this.setState({
      isAuth: false,
      listOfMailboxes: [],
      listOfMessages: [],
      errorText: "",
    });
  }
}
export default BaseLayout;

//TODO
//email validation
function findDomain(address: string): string {
  let i = 0;
  let domain = "";
  while (i < address.length) {
    if (address[i] == "@") {
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
