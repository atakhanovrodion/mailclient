import React from "react";
import { IMailbox } from "../api";
type Props = {
  mailboxes: IMailbox[];
};

const listOfMailboxes: React.FC<Props> = ({ mailboxes }) => {
  return <div>{mailboxes}</div>;
};
export default listOfMailboxes;
