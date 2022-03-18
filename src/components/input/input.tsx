import React, { InputHTMLAttributes } from "react";

import Style from "./Input.module.css";

type TypeProps = {
  name: string;
  label: string;
  error?: string | null;
};

const input: React.FC<InputHTMLAttributes<HTMLInputElement> & TypeProps> = ({
  name,
  label,
  error,
  ...props
}) => {
  return (
    <div className={Style["wrapper-input"]}>
      <label className={Style["label"]} htmlFor={name}>
        {label}
      </label>
      <input
        className={Style["input"]}
        name={name}
        id={name}
        onChange={props.onChange}
        value={props.value}
        onBlur={props.onBlur}
      />
      {error && <span className={Style["span-error"]}>{error}</span>}
    </div>
  );
};

export default input;
