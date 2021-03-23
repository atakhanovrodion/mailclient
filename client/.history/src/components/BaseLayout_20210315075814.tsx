import * as React from "react";
import Login from "./Login";
import * as api from "../api";
import Header from "./Header";
import ListOfMailboxes from "./ListOfMailboxes";
import ListOfMessages from "./ListOfMessages";
import WaitView from "./WaitView";
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
  waitState: boolean;
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
    loginEmail: "smtptest66@mail.ru",
    loginPassword: "imap1488",
    currenEmail: "undefined",
    currentPassword: "",
    listOfMailboxes: [],
    listOfMessages: [],
    currentHost: "",
    currentMailboxList: [],
    currentMessageBody: "",
    currentMailbox: "INBOx",
    waitState: false,
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
            />
          </div>
          <div className="centerArea">
            {" "}
            <ListOfMessages
              messages={this.state.listOfMessages}
              onClick={this.getMessage}
            />
            {this.state.currentMessageBody}{" "}
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
    });
  }

  signOut(): void {
    this.setState({
      isAuth: false,
      listOfMailboxes: [],
      listOfMessages: [],
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
  console.log(domain);
  return domain;
}
