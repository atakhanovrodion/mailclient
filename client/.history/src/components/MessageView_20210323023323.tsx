import React from "react";
import { InputBase } from "@material-ui/core";
import { TextField } from "@material-ui/core";
type Props = {
  viewState: string;
  messageText: string;
};

const MessageView: React.FC<Props> = (viewState, messageText) => {
  const test: boolean = true;
  return (
    <form>
      {test ? (
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
