import React from "react";
import Dialog from "@material-ui/core";

type Props = {
  isOpen: boolean;
};

const Login: React.FC<Props> = ({ isOpen }) => {
  return (
    <div>
      <Dialog open={isOpen}></Dialog>
    </div>
  );
};

export default Login;
