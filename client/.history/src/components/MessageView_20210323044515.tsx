import React from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
type Props = {
  messageText: string;
  viewState: string;
  date: Date;
  from: string;
  subject: string;
  onClick: any;
  mailbox: string;
};

const MessageView: React.FC<Props> = ({
  viewState,
  messageText,
  date,
  from,
  subject,
  onClick,
  mailbox,
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
            rows={14}
          />
          <Button
            onClick={() => {
              onClick(mailbox);
            }}
          >
            back
          </Button>
        </div>
      ) : (
        <div>
          <TextField
            variant="outlined"
            fullWidth={true}
            label="to"
            inputProps={{ style: { color: "#000000" } }}
          />
          <TextField
            variant="outlined"
            fullWidth={true}
            label="subject"
            inputProps={{ style: { color: "#000000" } }}
          />
          <TextField
            variant="outlined"
            InputLabelProps={{ shrink: true }
            multiline={true}
            fullWidth={true}
            label="message"
            inputProps={{ style: { color: "#000000" } }}
            rows={14}
          />
        </div>
      )}
    </form>
  );
};

export default MessageView;
