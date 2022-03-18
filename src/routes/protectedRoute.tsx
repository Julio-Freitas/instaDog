import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/usetContext";

type PropsType = {
  children?: React.ReactNode;
};
const ProtectedRoute = ({ children }: PropsType) => {
  const { login } = useContext(UserContext);

  return login ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
