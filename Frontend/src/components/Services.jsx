import axios from "axios";
import React, { useContext, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { ShoppingContext } from "../context/shoppingContext";
import { TYPES } from "../actions/shoppingAction";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { ShoppingCartState, ShoppingCartDispatch } =
    useContext(ShoppingContext);
  const { services } = ShoppingCartState;
  const navigate = useNavigate();

  useEffect(() => {
    const pedirServicios = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/services");

        ShoppingCartDispatch({
          type: TYPES.LOAD_SERVICES,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    pedirServicios();
  }, [ShoppingCartDispatch]);

  const viewCart = () => {
    navigate("/carrito");
  };

  return (
    <section className="services-container">
      {services.map((servicio) => (
        <ServiceCard key={servicio.id} servicio={servicio} />
      ))}
      <div>
        <button onClick={viewCart}>Ver carrito</button>
      </div>
    </section>
  );
};

export default Services;
