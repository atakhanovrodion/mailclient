import React from "react";
import { IMailbox } from "../api";
type Props = {
  mailboxes: IMailbox[];
};

const listOfMailboxes: React.FC = (mailboxes) => {
  return <div>{mailboxes}</div>;
};
export default listOfMailboxes;
