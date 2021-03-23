import React from "react";
import { IMailbox } from "../api";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
type Props = {
  mailboxes: IMailbox[];
  onClick: any;
};

const listOfMailboxes: React.FC<Props> = ({ mailboxes, onClick }) => {
  return (
    <List>
      {mailboxes.map((value) => {
        return <Chip onClick={onClick} label={`${value.name}`} />;
      })}
    </List>
  );
};
export default listOfMailboxes;
