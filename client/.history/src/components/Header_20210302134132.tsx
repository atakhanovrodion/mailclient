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
      {isAuth == true && (
        <div>
          Your email:{currentEmail}
          <Button onClick={onClick}>Sign out</Button>
        </div>
      )}
    </div>
  );
};
export default Header;
