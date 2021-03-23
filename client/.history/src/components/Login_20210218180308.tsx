import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";

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
        </form>
      </Dialog>
    </div>
  );
};

export default Login;
