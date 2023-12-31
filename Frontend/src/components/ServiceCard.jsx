import React, { useContext } from "react";
import { ShoppingContext } from "../context/shoppingContext";
import { TYPES } from "../actions/shoppingAction";

const ServiceCard = ({ servicio }) => {
  const { ShoppingCartDispatch } = useContext(ShoppingContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    ShoppingCartDispatch({
      type: TYPES.ADD_TO_CART,
      payload: servicio,
    });
  };

  return (
    <article className="service-card">
      <h3>{servicio.Nombre}</h3>
      <img src={servicio.Nombre} alt={servicio.Imagen} />
      <p>{servicio.Categoria}</p>
      <p>{servicio.Descripcion}</p>
      <p>{`Precio: $${servicio.Costo}`}</p>
      <form>
        <button onClick={handleAddToCart}>Agregar al carrito</button>
      </form>
    </article>
  );
};

export default ServiceCard;
