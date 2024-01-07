import React, { useContext, useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ServiceBought from "./ServiceBought";

const ServicesBought = () => {
  const { user } = useContext(AuthContext);
  const [servicesBought, setServicesBought] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getServicesBought = async () => {
      const userId = user.id;
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/services/boughtByCustomer/${userId}`
        );

        const { services } = res.data;

        setServicesBought(services);
      } catch (error) {
        // console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getServicesBought();
  }, [user.id]);

  return (
    <section>
      <article className="services-by-customer">
        <h3>Servicios comprados:</h3>
        {isLoading && <Loader />}
        {!isLoading && servicesBought.length === 0 && !error && (
          <p>No has comprado ningún servicio</p>
        )}
        {!isLoading &&
          servicesBought.length > 0 &&
          servicesBought.map((service) => (
            <ServiceBought key={service.id_detalleVenta} service={service} />
          ))}
        {error && <p>Hubo un error al cargar los servicios comprados</p>}
      </article>
    </section>
  );
};

export default ServicesBought;
