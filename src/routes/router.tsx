import { Routes, Route } from "react-router-dom";

import Produtos from "../pages/produtos";
import Produto from "../pages/produto";
import Contact from "../pages/contact";
import Home from "../pages/home";
import Login from "../pages/login";
import User from "../pages/user";

import ProtectedRoute from "./protectedRoute";
import { NotFound } from "../components/Error";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login/*" element={<Login />} />
      <Route path="produtos" element={<Produtos />} />
      <Route path="produtos/:id" element={<Produto />} />
      <Route path="contato" element={<Contact />} />
      <Route
        path="conta/*"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
