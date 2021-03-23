import React from "react";
import { IMailbox } from "../api";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
type Props = {
  mailboxes: IMailbox[];
  onClick: any;
  mailbox: string;
};

const listOfMailboxes: React.FC<Props> = ({ mailboxes, onClick, mailbox }) => {
  return (
    <List>
      {mailboxes.map((value) => {
        return (
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
        );
      })}
    </List>
  );
};
export default listOfMailboxes;
