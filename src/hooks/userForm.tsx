import React, { ChangeEvent } from "react";

type TypeValidation = (value: string) => boolean;

type TypesValue = {
  [key: string]: any;
};

const types: TypesValue = {
  email: {
    regex: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    message: "e-mail inválido",
  },
  password: {
    regex: /^[a-z0-9]/,
    message:
      "A senha precisar ter ao menos um caracter maiusculo e minusculo e um digito",
  },
  number: {
    regex: /^\d+$/,
    message: "somente números",
  },
};

export default function useForm(type?: string) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const validation: TypeValidation = (value) => {
    if (!type) return false;

    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (error) validation(target.value);
    setValue(target.value);
    setError(null);
  };

  return {
    validation: () => validation(value),
    onBlur: () => validation(value),
    onChange,
    value,
    error,
  };
}
