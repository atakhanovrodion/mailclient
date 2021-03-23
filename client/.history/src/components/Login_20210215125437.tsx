import React from "react";
import Dialog from "@material-ui/core";

const Props: {
  isOpen: boolean;
};

const Login: React.FC = (Props) => {
  return (
    <div>
      <Dialog open={Props.isOpen}></Dialog>
    </div>
  );
};

export default Login;
