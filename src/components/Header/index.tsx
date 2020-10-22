import React, { FC } from "react";

export interface Props {
  children?: any;
  text?: any;
}

export const Header: FC<Props> = ({ children, text }) => {
  return (
    <header>
      {text}
      <div>{children}</div>
    </header>
  );
};

export default Header;
