import React, { ButtonHTMLAttributes } from "react";

import Style from "./Button.module.css";

type TypeProps = {
  children: React.ReactNode;
  loading?: boolean;
};

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & TypeProps> = ({
  children,
  loading = false,
  ...props
}) => {
  return (
    <button className={Style["button"]} data-loading={loading} {...props}>
      {children}
    </button>
  );
};

export default Button;
