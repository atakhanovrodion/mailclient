import React from "react";
import { IMessage } from "../api";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

type Props = {
  messages: IMessage[];
  onClick: any;
};

const ListOfMessages: React.FC<Props> = ({ messages, onClick }) => (
  <Table stickyHeader padding="none">
    <TableHead>
      <TableRow>
        <TableCell style={{ width: 120 }}>Date</TableCell>
        <TableCell style={{ width: 300 }}>From</TableCell>
        <TableCell>Subject</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {messages.map((message) => (
        <TableRow
          onClick={() => {
            onClick(message);
          }}
          key={message.id}
        >
          <TableCell>{new Date(message.date).toLocaleDateString()}</TableCell>
          <TableCell>{message.from}</TableCell>
          <TableCell>{message.subject}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
); /* Mailboxes. */

export default ListOfMessages;
