import React, { useContext, useState } from "react";
import { ShoppingContext } from "../../context/shoppingContext";
import { TYPES } from "../../actions/shoppingAction";
import ShoppingCartEmpty from "./ShoppingCartEmpty";
import ShoppingCartCard from "./ShoppingCartCard";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ShoppingComplete from "./ShoppingComplete";

const ShoppingCart = () => {
  const { ShoppingCartState, ShoppingCartDispatch } =
    useContext(ShoppingContext);
  const { user } = useContext(AuthContext);
  const [succesfullyShopping, setSuccesfullyShopping] = useState(null);

  const cartEmpty = ShoppingCartState.cart.length === 0 ? true : false;
  const { cart, totalCost } = ShoppingCartState;

  const onBuy = async (e) => {
    e.preventDefault();

    const data = {
      cart,
      user: { ...user, telContacto: "123456789" },
      totalCost,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/services/buy",
        data
      );
      console.log(res);
      console.log(res.data);
      ShoppingCartDispatch({
        type: TYPES.CLEAR_CART,
      });
      setSuccesfullyShopping(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onClear = async (e) => {
    e.preventDefault();
    ShoppingCartDispatch({
      type: TYPES.CLEAR_CART,
    });
  };

  return (
    <section className="shopping-container">
      {cartEmpty && !succesfullyShopping && <ShoppingCartEmpty />}
      {cartEmpty && succesfullyShopping && <ShoppingComplete />}
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
