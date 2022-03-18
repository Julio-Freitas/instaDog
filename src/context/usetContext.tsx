import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GET_USER, TOKEN_POST, TOKEN_VALIDATE_POST } from "../api/api";

type UserContextType = {
  children: React.ReactNode;
};

type UserLogin = {
  username: string;
  password: string;
};

type User = {
  email: string;
  id: number;
  nome: string;
  username: string;
};

type ValueUserContext = {
  userLogin: (user: UserLogin) => void;
  data: User | null;
  error: string | null;
  login: boolean | null;
  loading: boolean | null;
  userLogout: () => void;
};

export const UserContext = React.createContext<ValueUserContext>({
  userLogin: () => null,
  data: null,
  error: null,
  login: null,
  loading: null,
  userLogout: () => {},
});

export const UserStorage = ({ children }: UserContextType) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const userLogout = useCallback(async () => {
    setData(null);
    setLoading(false);
    setLogin(null);
    setError(null);
    window.localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  const getUser = useCallback(
    async (token: string) => {
      try {
        setError(null);
        const { url, options } = GET_USER(token);
        const request = await fetch(url, options);
        const responseJson = await request.json();
        if (!request.ok) throw new Error();

        setData(responseJson);
        setLogin(true);
        navigate("/conta");
      } catch (error) {
        setError("Error ao pegar o usuário...");
        await userLogout();
      } finally {
        setLoading(false);
      }
    },
    [userLogout, navigate]
  );

  const autoLoginUser = useCallback(
    async (token: string) => {
      try {
        setError(null);
        setLoading(true);
        const { url, options } = TOKEN_VALIDATE_POST(token);
        const requestToken = await fetch(url, options);
        if (!requestToken.ok) throw new Error("Token inválido..");

        await getUser(token);
      } catch (error) {
        setError("Algo deu errado...");
        await userLogout();
      } finally {
        setLoading(false);
      }
    },
    [getUser, userLogout]
  );

  async function userLogin({ username, password }: UserLogin) {
    try {
      setLoading(true);
      setError(null);

      const { url, options } = TOKEN_POST({ username, password });
      const requestToken = await fetch(url, options);
      if (!requestToken.ok) throw new Error();
      const { token } = await requestToken.json();
      window.localStorage.setItem("token", token);
      getUser(token);
    } catch (error) {
      setError("Error ao fazer o login");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token && !login) autoLoginUser(token);
  }, [autoLoginUser, login]);

  const value = {
    userLogin,
    data,
    error,
    login,
    loading,
    userLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
