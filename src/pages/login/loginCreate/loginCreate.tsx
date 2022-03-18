import React, { FormEvent, useContext } from "react";
import { POST_USER } from "../../../api/api";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { UserContext } from "../../../context/usetContext";
import useFetch from "../../../hooks/useFetch";
import useForm from "../../../hooks/userForm";

import Style from "./Login.module.css";

const LoginCreate: React.FC = () => {
  const username = useForm("text");
  const email = useForm("email");
  const password = useForm("text");
  const { userLogin } = useContext(UserContext);
  const { loading, error, request } = useFetch();

  const _handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { url, options } = POST_USER({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response?.ok)
      userLogin({ username: username.value, password: password.value });
  };

  return (
    <section className={Style["logincreate"]}>
      <h2 className="title">Cadastre-se</h2>
      <form onSubmit={_handleSubmit}>
        <Input
          label="Usuário"
          name="username"
          type="text"
          onChange={username.onChange}
          value={username.value}
          placeholder="Usuário"
          error={username.error}
          onBlur={username.onBlur}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          onChange={email.onChange}
          value={email.value}
          placeholder="Email"
          error={email.error}
          onBlur={email.onBlur}
        />

        <Input
          label="Senha"
          name="password"
          type="password"
          onChange={password.onChange}
          value={password.value}
          placeholder="Senha"
          error={password.error}
          onBlur={password.onBlur}
        />

        <Button disabled={loading} type="submit">
          Cadastrar
        </Button>
        <p>{error}</p>
      </form>
    </section>
  );
};

export default LoginCreate;
