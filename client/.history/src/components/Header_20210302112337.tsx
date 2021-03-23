import React from "react";
import Button from "@material-ui/core/Button";
type Props = {
  currentEmail: string;
};

const Header: React.FC<Props> = ({ currentEmail }) => {
  return (
    <div>
      Your email:{currentEmail}
      <Button>Sign out</Button>
    </div>
  );
};
export default Header;
