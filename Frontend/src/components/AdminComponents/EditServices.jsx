import axios from "axios";
import React, { useEffect, useState } from "react";
import EditServiceCard from "./EditServiceCard";
import { Link, useNavigate } from "react-router-dom";

const EditServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/services");
        setServices(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getServices();
  }, []);

  const changeAvailability = async (id) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `http://localhost:3000/api/services/availability/${id}`,
      });
      console.log(res);
      if (res.data.succes) {
        const newServices = services.map((service) =>
          service.id === id
            ? { ...service, Disponible: !service.Disponible }
            : service
        );
        setServices(newServices);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditService = (id) => {
    navigate(`/admin/edit-service/${id}`);
  };

  const onDeleteService = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `http://localhost:3000/api/services/${id}`,
      });
      // console.log(res);
      if (res.data.succes) {
        const newServices = services.filter((service) => service.id !== id);
        setServices(newServices);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="edit-services">
      <h2>Editar Servicios</h2>
      {services.length > 0 &&
        services.map((service) => (
          <EditServiceCard
            key={service.id}
            service={service}
            changeAvailability={changeAvailability}
            onEditService={onEditService}
            onDeleteService={onDeleteService}
          />
        ))}
      <div className="add-service">
        <Link to={"/admin/add-service"}>Agregar Servicio</Link>
      </div>
    </section>
  );
};

export default EditServices;
