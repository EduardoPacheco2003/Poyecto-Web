import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Footer</p>
      <Link to={"/terminos"}>Terminos y Condiciones</Link>
    </footer>
  );
};

export default Footer;
