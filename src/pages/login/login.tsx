import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginCreate from "./loginCreate";
import LoginForm from "./loginForm";
import LoginLost from "./loginLost";
import LoginReset from "./loginReset";

import Style from "./Login.module.css";

const Login: React.FC = () => {
  return (
    <section className={Style["login"]}>
      <div className={Style["forms"]}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginLost />} />
          <Route path="resetar" element={<LoginReset />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
