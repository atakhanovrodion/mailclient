import React from "react";
import Button from "@material-ui/core/Button";
type Props = {
  currentEmail: string;
  isAuth: boolean;
};

const Header: React.FC<Props> = ({ currentEmail, isAuth }) => {
  return (
    <div>
      Your email:{currentEmail}
      <Button>Sign out</Button>
    </div>
  );
};
export default Header;
