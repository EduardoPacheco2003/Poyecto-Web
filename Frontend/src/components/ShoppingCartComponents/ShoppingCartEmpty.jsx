import React from "react";
import { NavLink } from "react-router-dom";

const ShoppingCartEmpty = () => {
  return (
    <div>
      <h2>Su carrito esta vacio, selecciona unos servicios</h2>
      <NavLink to="/servicios">Ir a servicios</NavLink>
    </div>
  );
};

export default ShoppingCartEmpty;
