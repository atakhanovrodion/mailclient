import React from "react";
import Button from "@material-ui/core/Button";
type Props = {
  onClick: any;
  currentEmail: string;
  isAuth: boolean;
};

const Header: React.FC<Props> = ({ onClick, currentEmail, isAuth }) => {
  return (
    <div>
      Your email:{currentEmail}
      <Button>Sign out</Button>
    </div>
  );
};
export default Header;
