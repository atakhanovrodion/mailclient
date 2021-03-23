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
  currentMailboxList: [];
};

class BaseLayout extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.tryAuth = this.tryAuth.bind(this);
    this.signOut = this.signOut.bind(this);
  }
  state: MyState = {
    isAuth: false,
    loginEmail: "smtptest66@mail.ru",
    loginPassword: "imap1488",
    currenEmail: "undefined",
    currentPassword: "",
    listOfMailboxes: [],
    currentHost: "",
    currentMailboxList: [],
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
            <Header
              onClick={this.signOut}
              currentEmail={this.state.currenEmail}
              isAuth={this.state.isAuth}
            />
          </div>
          <div className="listOfMailboxes">
            <ListOfMailboxes mailboxes={this.state.listOfMailboxes} />
          </div>
          <div className="centerArea"> TEST </div>
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
      this.getListOfMailboxes();
      const data = {
        loginEmail: "",
        loginPassword: "",
        isAuth: true,
        currenEmail: this.state.loginEmail,
        currentPassword: this.state.currentPassword,
        currentHost: domain,
      };
      this.setState(data);
      console.log(this.state);
    }
    this.setState({ loginEmail: "", loginPassword: "" });
  }
  async getListOfMailboxes(): Promise<void> {
    console.log(this.state.currentHost);
    const host = "imap." + this.state.currentHost;
    const info: api.IAuthInfo = {
      user: this.state.loginEmail,
      password: this.state.loginPassword,
      host: host,
      port: 993,
    };
    const apiWorker = new api.Worker(info);
    const mailboxes = await apiWorker.listOfMailboxes();
    this.setState({ listOfMailboxes: mailboxes });
  }
  async getMailbox(id: number): Promise<void> {}
  signOut(): void {
    this.setState({
      isAuth: false,
      listOfMailboxes: [],
    });
  }
}
export default BaseLayout;

//TODO
//email validation
function findDomain(addres: string): string {
  return "mail.ru";
}
