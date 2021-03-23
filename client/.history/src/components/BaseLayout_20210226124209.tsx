import * as React from "react";
import Login from "./Login";
import * as api from "../api";
import Header from "./Header";
import ListOfMailboxes from "./ListOfMailboxes";
type MyState = {
  isAuth: false;
  loginEmail: string;
  loginPassword: string;
  currenEmail: string;
  currentPassword: string;
  listOfMailboxes: api.IMailbox[];
  currentHost: string;
};

class BaseLayout extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.tryAuth = this.tryAuth.bind(this);
  }
  state: MyState = {
    isAuth: false,
    loginEmail: "smtptest66@mail.ru",
    loginPassword: "imap1488",
    currenEmail: "undefined",
    currentPassword: "",
    listOfMailboxes: [],
    currentHost: "",
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

        <div className="appContainer">
          <div className="header">
            <Header currentEmail={this.state.currenEmail} />
          </div>
          <div className="listOfMailboxes">
            <ListOfMailboxes mailboxes={this.state.listOfMailboxes} />
          </div>
          <div className="centerArea"> </div>
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
    const apiWorker = new api.Worker(info);

    if ((await apiWorker.tryAuth()) == "succes") {
      const mailboxes = this.getListOfMailboxes();
      const data = {
        loginEmail: "",
        loginPassword: "",
        isAuth: true,
        currenEmail: this.state.loginEmail,
        currentPassword: this.state.currentPassword,
        listOfMailboxes: mailboxes,
        currentHost: domain,
      };
      this.setState(data);
      console.log(this.state);
    }
    this.setState({ loginEmail: "", loginPassword: "" });
  }
  async getListOfMailboxes(): Promise<api.IMailbox[]> {
    const info: api.IAuthInfo = {
      user: this.state.loginEmail,
      password: this.state.loginPassword,
      host: "imap." + this.state.currentHost,
      port: 993,
    };
    const apiWorker = new api.Worker(info);
    const mailboxes = await apiWorker.listOfMailboxes();
    return mailboxes;
  }
}
export default BaseLayout;

//TODO
//email validation
function findDomain(addres: string): string {
  return "mail.ru";
}
