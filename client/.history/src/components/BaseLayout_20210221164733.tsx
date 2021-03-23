import * as React from "react";
import Login from "./Login";
import * as IMAP from "../api/IMAP";
import Header from "./Header";
import ListOfMailboxes from "./ListOfMailboxes";
type MyState = {
  isAuth: boolean;
  loginEmail: string;
  loginPassword: string;
  currenEmail: string;
  currentPassword: string;
  listOfMailboxes: IMAP.IMailbox[];
};

class BaseLayout extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.tryAuth = this.tryAuth.bind(this);
  }
  state: MyState = {
    isAuth: false,
    loginEmail: "",
    loginPassword: "",
    currenEmail: "smtptest66@mail.ru",
    currentPassword: "imap1488",
    listOfMailboxes: [],
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
            <ListOfMailboxes />
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
    const info: IMAP.IAuthInfo = {
      user: this.state.loginEmail,
      password: this.state.loginPassword,
      host: "imap.mail.ru",
      port: 993,
    };
    const imapWorker = new IMAP.Worker(info);

    if ((await imapWorker.tryAuth()) == "succes") {
      const mailboxes = this.getListOfMailboxes();
      const data = {
        loginEmail: "",
        loginPassword: "",
        isAuth: true,
        currenEmail: this.state.loginEmail,
        currentPassword: this.state.currentPassword,
        listOfMailboxes: mailboxes,
      };
      this.setState(data);
      console.log(this.state);
    }
    this.setState({ loginEmail: "", loginPassword: "" });
  }
  async getListOfMailboxes(): Promise<IMAP.IMailbox[]> {
    const info: IMAP.IAuthInfo = {
      user: this.state.loginEmail,
      password: this.state.loginPassword,
      host: "imap.mail.ru",
      port: 993,
    };
    const imapWorker = new IMAP.Worker(info);
    const mailboxes = await imapWorker.listOfMailboxes();
    return mailboxes;
  }
}
export default BaseLayout;