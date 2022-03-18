import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Dogs } from "../../assets/dogs.svg";
import { ReactComponent as User } from "../../assets/usuario.svg";
import { UserContext } from "../../context/usetContext";

import Style from "./header.module.css";

const Header: React.FC = () => {
  const { data } = useContext(UserContext);

  return (
    <header className={Style["header"]}>
      <nav className={Style["nav-header"]}>
        <Link to="/" className={Style["logo"]}>
          <Dogs />
        </Link>

        {data ? (
          <div className={Style["user-logged"]}>
            <Link to="/conta" className={Style["user-logged"]}>
              {data.email}
              <User />
            </Link>
          </div>
        ) : (
          <Link to="/login" className={Style["login"]}>
            Login/ criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

/*  <nav className={Style["nav-header"]}>
    
    <NavLink to="produtos" end>
        Produtos
      </NavLink>
      <NavLink to="contato" end>
        Contato
      </NavLink>
    </nav>

    */
