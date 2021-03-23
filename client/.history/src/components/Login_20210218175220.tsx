import React from "react";
import Dialog from "@material-ui/core/Dialog";

type Props = {
  isOpen: boolean;
};

const Login: React.FC<Props> = ({ isOpen }) => {
  return (
    <div>
      <Dialog open={!isOpen}>
        <div>test</div>
      </Dialog>
    </div>
  );
};

export default Login;
