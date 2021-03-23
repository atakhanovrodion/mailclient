import React from "react";
import Button from "@material-ui/core/Button";
type Props = {
  onClick: any;
  changeView: any;
  currentEmail: string;
  isAuth: boolean;
};

const Header: React.FC<Props> = ({
  onClick,
  currentEmail,
  isAuth,
  changeView,
}) => {
  return (
    <div>
      {isAuth == true ? (
        <div>
          Your email:{currentEmail}
          <Button onClick={changeView}>Write email</Button>
          <Button onClick={onClick}>Sign out</Button>
        </div>
      ) : (
        <div>Login pleases </div>
      )}
    </div>
  );
};
export default Header;
