import NavLinkApp from "../../../components/navLinkApp";
import { ReactComponent as MyPhotos } from "../../../assets/feed.svg";
import { ReactComponent as Analytics } from "../../../assets/estatisticas.svg";
import { ReactComponent as Add } from "../../../assets/adicionar.svg";

import Style from "./UserHeader.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const UserHeader = () => {
  const [currentTile, setCurrentTitle] = useState("Conta");
  const location = useLocation();

  useEffect(() => {
    const pathNames = location.pathname
      .split("/")
      .filter((item) => item.length);
    if (pathNames.length > 1) {
      setCurrentTitle(pathNames[1]);
    } else {
      setCurrentTitle(pathNames[0]);
    }
  }, [location]);
  return (
    <header className={Style["header-nav"]}>
      <h1 className="title">{currentTile}</h1>

      <NavLinkApp
        navLinks={[
          {
            to: "/conta",
            label: "Minhas Fotos",
            icon: <MyPhotos />,
          },
          {
            to: "/conta/estatisticas",
            label: "Estatisticas",
            icon: <Analytics />,
          },
          {
            to: "/conta/fotos",
            label: "Adicionar Fotos",
            icon: <Add />,
          },
        ]}
      />
    </header>
  );
};

export default UserHeader;
