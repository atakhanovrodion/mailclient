import React from "react";
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type Props = {
  onSubmit: any;
  onChange: any;
  isOpen: boolean;
  user: string;
  pass: string;
  classes: any;
};

const styles = {
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
};

const Login: React.FC<Props> = ({
  onSubmit,
  onChange,
  isOpen,
  user,
  pass,
  classes,
}) => {
  return (
    <Dialog
      open={!isOpen}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      classes={{ paper: classes.dialogPaper }}
    >
      <form>
        <TextField
          id="loginEmail"
          onChange={onChange}
          label="email"
          value={user}
        />
        <TextField
          id="loginPassword"
          onChange={onChange}
          label="password"
          value={pass}
        />
        <Button onClick={onSubmit}>Sig in</Button>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(Login);
