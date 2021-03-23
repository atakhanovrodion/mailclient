import React from "react";
import { IMailbox } from "../api";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
type Props = {
  mailboxes: IMailbox[];
};

const listOfMailboxes: React.FC<Props> = ({ mailboxes }) => {
  return (
    <List>
      {mailboxes.map((value) => {
        return (
          <Chip
            label={`${value.name}`}
            style={{ width: 128, marginBottom: 11 }}
          />
        );
      })}
    </List>
  );
};
export default listOfMailboxes;
