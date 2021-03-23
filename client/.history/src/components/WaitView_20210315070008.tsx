import React from "react";

import Dialog from "@material-ui/core/Dialog";

type Props = {
  state: boolean;
};

const WaitView: React.FC<Props> = ({ state }) => {
  return (
    <Dialog
      open={state}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      KEKW
    </Dialog>
  );
};

export default WaitView;
