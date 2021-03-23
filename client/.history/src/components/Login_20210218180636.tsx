import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
type Props = {
  isOpen: boolean;
};

const Login: React.FC<Props> = ({ isOpen }) => {
  return (
    <div>
      <Dialog open={!isOpen}>
        <form>
          <TextField label="email" />
          <TextField label="password" />
          <Button>Sing in</Button>
        </form>
      </Dialog>
    </div>
  );
};

export default Login;
