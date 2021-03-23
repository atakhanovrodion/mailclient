import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

type Props = {
  state: boolean;
};

const WaitView: React.FC<Props> = ({ state }) => {
  return (
    <Dialog
      open={state}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      transitionDuration={0}
    >
      <DialogContent>
        <DialogContentText>Please wait...</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default WaitView;
