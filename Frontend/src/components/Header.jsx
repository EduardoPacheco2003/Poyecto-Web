import React, { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import HeaderHamburgerButton from "./HeaderHamburgerButton";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const headerMenu = useRef(null);
  const loginMenu = useRef(null);
  const header = useRef(null);
  const hamburgerButton = useRef(null);
  const { auth, logoutUser, user } = useContext(AuthContext);
  const { userRole } = user;

  const openMenu = () => {
    if (hamburgerButton.current) {
      if (header.current.classList.contains("open")) {
        hamburgerButton.current.classList.remove("is-active");
        header.current.classList.remove("open");
      } else {
        hamburgerButton.current.classList.add("is-active");
        header.current.classList.add("open");
      }
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    openMenu();
  };

  return (
    <>
      <header className="header" ref={header}>
        <h3>
          <NavLink to={"/"}>Page</NavLink>
        </h3>
        <nav className="header-nav" ref={headerMenu}>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            onClick={openMenu}
            to={"/"}>
            Inicio
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            onClick={openMenu}
            to={"/servicios"}>
            Servicios
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            onClick={openMenu}
            to={"/acerca-de"}>
            Acerca de
          </NavLink>
          {auth && (
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : null)}
              onClick={openMenu}
              to={"/carrito"}>
              Carrito
            </NavLink>
          )}
        </nav>
        <nav className="header-nav nav-auth" ref={loginMenu}>
          {!auth && (
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : null)}
              onClick={openMenu}
              to={"login"}>
              Login
            </NavLink>
          )}
          {!auth && (
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : null)}
              onClick={openMenu}
              to={"register"}>
              Register
            </NavLink>
          )}
          {auth && (
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : null)}
              onClick={openMenu}
              to={"dashboard"}>
              Perfil
            </NavLink>
          )}
          {auth && userRole.includes("Admin") && (
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : null)}
              onClick={openMenu}
              to={"admin"}>
              Admin
            </NavLink>
          )}
          {auth && (
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : null)}
              onClick={handleLogout}
              to={"/"}>
              Cerrar Sesion
            </NavLink>
          )}
        </nav>
      </header>
      <HeaderHamburgerButton
        loginMenu={loginMenu}
        headerMenu={headerMenu}
        hamburgerButton={hamburgerButton}
        openMenu={openMenu}
      />
    </>
  );
};

export default Header;
