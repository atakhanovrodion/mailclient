import React from "react";
import { InputBase } from "@material-ui/core";
import { TextField } from "@material-ui/core";
type Props = {};

const MessageView: React.FC<Props> = () => {
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
