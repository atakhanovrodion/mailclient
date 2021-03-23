import React from "react";
import { InputBase } from "@material-ui/core";
import { TextField } from "@material-ui/core";
type Props = {
  messageText: string;
  viewState: string;
};

const MessageView: React.FC<Props> = (viewState, messageText) => {
  return (
    <form>
      {messageText ? (
        <div>
          <InputBase />
          sd <InputBase />
          <InputBase /> sd
          <InputBase />
        </div>
      ) : (
        <div>test2</div>
      )}
    </form>
  );
};

export default MessageView;
