import React from "react";
import { InputBase } from "@material-ui/core";
import { TextField } from "@material-ui/core";
type Props = {
  messageText: string;
  viewState: string;
  date: Date;
  from: string;
  subject: string;
};

const MessageView: React.FC<Props> = ({
  viewState,
  messageText,
  date,
  from,
  subject,
}) => {
  return (
    <form>
      {viewState == "view" ? (
        <div>
          <TextField
            variant="outlined"
            fullWidth={true}
            disabled={true}
            value={new Date(date).toLocaleDateString()}
            label="date"
            inputProps={{ style: { color: "#000000" } }}
          />
          <TextField
            variant="outlined"
            fullWidth={true}
            disabled={true}
            value={from}
            label="from"
            inputProps={{ style: { color: "#000000" } }}
          />
          <TextField
            variant="outlined"
            fullWidth={true}
            disabled={true}
            value={subject}
            label="subject"
            inputProps={{ style: { color: "#000000" } }}
          />
          <TextField
            variant="outlined"
            multiline={true}
            fullWidth={true}
            disabled={true}
            value={messageText}
            label="message"
            inputProps={{ style: { color: "#000000" } }}
          />
        </div>
      ) : (
        <div>test2</div>
      )}
    </form>
  );
};

export default MessageView;
