/* eslint-disable */

import React from "react";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import { IMailbox } from "../api";

type Props = {
  mailboxes: IMailbox[];
  onClick: any;
  mailbox: string;
};

const listOfMailboxes: React.FC<Props> = ({ mailboxes, onClick, mailbox }) => (
  <List>
    {mailboxes.map((value) => (
      <Chip
        style={{
          marginBottom: 5,
          width: 125,
        }}
        onClick={() => {
          onClick(value.path);
        }}
        label={`${value.name}`}
        variant="outlined"
        color={mailbox === value.path ? "secondary" : "default"}
      />
    ))}
  </List>
);
export default listOfMailboxes;
