import React, { ButtonHTMLAttributes } from "react";

import Style from "./PhotoDelete.module.css";

const PhotoDelete: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button type="button" className={Style["button-delete"]} {...props}>
      Deletar
    </button>
  );
};

export default PhotoDelete;
