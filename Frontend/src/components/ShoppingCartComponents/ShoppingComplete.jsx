import React from "react";
import { useNavigate } from "react-router-dom";

const ShoppingComplete = () => {
  const navigate = useNavigate();

  const onSeeServices = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <article>
      <h2>Compra realizada con éxito</h2>
      <p>Gracias por su compra</p>
      <p>Nosotros nos pondremos en contacto con usted</p>
      <button onClick={onSeeServices}>Ver Compras recientes</button>
    </article>
  );
};

export default ShoppingComplete;
