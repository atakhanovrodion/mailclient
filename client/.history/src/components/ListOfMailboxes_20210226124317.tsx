import React from "react";
import { IMailbox } from "../api";
type Props = {
  mailboxes: IMailbox[];
};

const listOfMailboxes: React.FC<Props> = ({ mailboxes }) => {
  {
    console.log(mailboxes);
  }
  return <div></div>;
};
export default listOfMailboxes;
