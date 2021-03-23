import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
type Props = {
  onSubmit: any;
  onChange: any;
  isOpen: boolean;
};

const Login: React.FC<Props> = ({ onSubmit, onChange, isOpen }) => {
  return (
    <div>
      <Dialog open={!isOpen}>
        <form>
          <TextField id="loginEmail" onChange={onChange} label="email" />
          <TextField id="loginPassword" onChange={onChange} label="password" />
          <Button onClick={onSubmit}>Sing in</Button>
        </form>
      </Dialog>
    </div>
  );
};

export default Login;
