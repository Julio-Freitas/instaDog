import React, { FormEvent, useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../../../components/button";
import Input from "../../../components/input";
import Loading from "../../../components/loading";
import { UserContext } from "../../../context/usetContext";
import useForm from "../../../hooks/userForm";

import Style from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  const { userLogin, loading, error } = useContext(UserContext);

  const username = useForm("text");
  const password = useForm("text");

  const _handleSubmitLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (!password.validation() && !username.validation()) return;
    userLogin({ username: username.value, password: password.value });
  };

  return (
    <>
      {loading && <Loading />}

      <section className="animateLeft">
        <h2 className="title">Login</h2>
        <form onSubmit={_handleSubmitLogin} className={Style["form"]}>
          <Input
            label="Nome"
            name="name"
            type="text"
            onChange={username.onChange}
            value={username.value}
            placeholder="usuário"
            error={username.error}
            onBlur={username.onBlur}
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            error={password.error}
          />

          <Button loading={!!loading} type="submit">
            Enviar
          </Button>
          <p>{error}</p>
        </form>
        <Link to="/login/perdeu" className={Style["lost"]}>
          Perdeu a senha?
        </Link>
        <div className={Style["create-account"]}>
          <h2 className={Style["subtitle"]}>Cadastra-se</h2>
          <p>Ainda não possui conta? Cadastra-se no site!</p>

          <Button type="button">
            <Link className={Style["button-create"]} to="/login/criar">
              Cadastro
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
