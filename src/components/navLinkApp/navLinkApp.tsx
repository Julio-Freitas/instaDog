import React, {
  RefObject,
  SVGProps,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavLink, useLocation } from "react-router-dom";

import { UserContext } from "../../context/usetContext";

import Button from "../button";

import { ReactComponent as LogoutIcon } from "../../assets/sair.svg";
import Style from "./NavLinkApp.module.css";
import useMedia from "../../hooks/useMedia";
import useClickOutside from "../../hooks/useClickoutside";

type NavItemType = {
  to: string;
  label: string;
  icon?: SVGProps<SVGSVGElement>;
};

type PropsType = {
  navLinks: NavItemType[];
};

const NavLinkApp: React.FC<PropsType> = ({ navLinks }) => {
  const bellow_media_700 = useMedia(700);
  const { userLogout } = useContext(UserContext);
  const [showContentMobile, setShowContentMobilde] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  useClickOutside(
    menuRef,
    (clickoutside) => clickoutside && setShowContentMobilde(false)
  );

  useEffect(() => {
    if (location.pathname) setShowContentMobilde(false);
  }, [location.pathname]);

  return (
    <div ref={menuRef}>
      {bellow_media_700 ? (
        <button
          aria-label="Menu"
          className={Style["button-menu-mobile"]}
          data-active={showContentMobile}
          onClick={() => setShowContentMobilde(!showContentMobile)}
        />
      ) : null}
      <nav
        className={Style["navlink"]}
        data-menu-mobile={bellow_media_700}
        data-show-menu-mobile={bellow_media_700 ? showContentMobile : "true"}
      >
        {navLinks.map(({ label, to, icon }) => (
          <NavLink key={`${label}+${to}`} to={to} end>
            {icon}
            {bellow_media_700 && label}
          </NavLink>
        ))}

        <Button type="submit" onClick={userLogout}>
          {bellow_media_700 && "Sair"}
          <LogoutIcon />
        </Button>
      </nav>
    </div>
  );
};

export default NavLinkApp;
