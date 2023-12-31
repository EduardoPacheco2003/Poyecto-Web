import React, { useContext } from "react";
import { ShoppingContext } from "../../context/shoppingContext";
import { TYPES } from "../../actions/shoppingAction";

const ShoppingCartCard = ({ servicio }) => {
  const { ShoppingCartDispatch } = useContext(ShoppingContext);

  const deleteFromCart = (id, all = false) => {
    if (all) {
      ShoppingCartDispatch({
        type: TYPES.REMOVE_ALL_FROM_CART,
        payload: id,
      });
    } else {
      ShoppingCartDispatch({
        type: TYPES.REMOVE_ONE_FROM_CART,
        payload: id,
      });
    }
  };

  const subTotal = (servicio.Costo * servicio.cantidad).toFixed(2);

  return (
    <article className="shopping-card ">
      <h3>{servicio.Nombre}</h3>
      <img src={servicio.Nombre} alt={servicio.Imagen} />
      <p>{servicio.Categoria}</p>
      <p>{servicio.Descripcion}</p>
      <p>{`Precio: $${servicio.Costo}`}</p>
      <p>{`Cantidad: ${servicio.cantidad}`}</p>
      <p>Sub-Total: ${subTotal}</p>
      <button onClick={() => deleteFromCart(servicio.id)}>Eliminar Uno</button>
      <button onClick={() => deleteFromCart(servicio.id, true)}>
        Eliminar Todos
      </button>
    </article>
  );
};

export default ShoppingCartCard;
