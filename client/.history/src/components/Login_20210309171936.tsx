import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
type Props = {
  onSubmit: any;
  onChange: any;
  isOpen: boolean;
  user: string;
  pass: string;
};

const Login: React.FC<Props> = ({ onSubmit, onChange, isOpen, user, pass }) => {
  return (
    <div>
      <Dialog
        open={!isOpen}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        fullScreen={true}
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
    </div>
  );
};

export default Login;
