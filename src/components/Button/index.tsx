import React, { FC, MouseEvent } from "react";

export interface Props {
  title?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  classNames?: any;
}

export const Button: FC<Props> = ({ title, onClick, classNames }) => {
  return (
    <button onClick={onClick} className={classNames}>
      {title || `some label`}
    </button>
  );
};

export default Button;
