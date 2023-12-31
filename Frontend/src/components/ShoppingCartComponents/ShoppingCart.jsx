import React, { useContext } from "react";
import { ShoppingContext } from "../../context/shoppingContext";
import { TYPES } from "../../actions/shoppingAction";
import ShoppingCartEmpty from "./ShoppingCartEmpty";
import ShoppingCartCard from "./ShoppingCartCard";

const ShoppingCart = () => {
  const { ShoppingCartState, ShoppingCartDispatch } =
    useContext(ShoppingContext);
  const cartEmpty = ShoppingCartState.cart.length === 0 ? true : false;
  const { cart, totalCost } = ShoppingCartState;

  const onBuy = async (e) => {
    e.preventDefault();
  };

  const onClear = async (e) => {
    e.preventDefault();
    ShoppingCartDispatch({
      type: TYPES.CLEAR_CART,
    });
  };

  return (
    <section className="shopping-container">
      {cartEmpty && <ShoppingCartEmpty />}
      {!cartEmpty &&
        cart.map((service) => (
          <ShoppingCartCard key={service.id} servicio={service} />
        ))}
      {!cartEmpty && <p>Costo total: ${totalCost}</p>}
      {!cartEmpty && <button onClick={onClear}>Limpiar Carrito</button>}
      {!cartEmpty && <button onClick={onBuy}>Comprar</button>}
    </section>
  );
};

export default ShoppingCart;
