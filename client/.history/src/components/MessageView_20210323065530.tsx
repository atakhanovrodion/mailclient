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
  onChange: any;
  sendMessage: any;
};

const MessageView: React.FC<Props> = ({
  viewState,
  messageText,
  date,
  from,
  subject,
  onClick,
  mailbox,
  onChange,
  sendMessage,
}) => {
  return (
    <form>
      {(viewState == "view" || viewState == "new") && (
        <div>
          {viewState == "view" && (
            <TextField
              variant="outlined"
              fullWidth={true}
              disabled={true}
              value={new Date(date).toLocaleDateString()}
              label="date"
              inputProps={{ style: { color: "#000000" } }}
            />
          )}
          <TextField
            variant="outlined"
            fullWidth={true}
            id="from"
            disabled={viewState == "view"}
            onChange={onChange}
            value={from}
            label={viewState == "view" ? "from" : "to"}
            inputProps={{ style: { color: "#000000" } }}
          />
          <TextField
            variant="outlined"
            fullWidth={true}
            id="subject"
            disabled={viewState == "view"}
            value={subject}
            onChange={onChange}
            label="subject"
            inputProps={{ style: { color: "#000000" } }}
          />
          <TextField
            variant="outlined"
            multiline={true}
            id="currentMessageBody"
            fullWidth={true}
            disabled={viewState == "view"}
            onChange={onChange}
            value={messageText}
            label="message"
            inputProps={{ style: { color: "#000000" } }}
            rows={14}
          />
          <Button
            onClick={() => {
              onClick(mailbox);
            }}
          ></Button>
          {viewState == "view" ? (
            <Button
              onClick={() => {
                onClick(mailbox);
              }}
            >
              BACK
            </Button>
          ) : (
            <Button onClick={sendMessage}>SEND</Button>
          )}
        </div>
      )}
    </form>
  );
};

export default MessageView;
