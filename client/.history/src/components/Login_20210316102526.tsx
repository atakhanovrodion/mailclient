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
  errorText: string;
};

const styles = {
  dialogPaper: {
    minHeight: "50vh",
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
  errorText,
}) => {
  return (
    <Dialog
      open={!isOpen}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      fullWidth={true}
      classes={{ paper: classes.dialogPaper }}
    >
      <form className="loginForm">
        <TextField
          id="loginEmail"
          onChange={onChange}
          label="email"
          value={user}
          error={errorText === ""}
        />
        <TextField
          id="loginPassword"
          onChange={onChange}
          label="password"
          type="password"
          value={pass}
          error={errorText === ""}
          helperText={"make sure "}
        />
        <Button onClick={onSubmit}>Sign in</Button>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(Login);
