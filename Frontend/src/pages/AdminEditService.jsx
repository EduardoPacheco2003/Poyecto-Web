import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditServiceForm from "../components/AdminComponents/EditServiceForm";

const AdminEditService = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const getServiceById = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/services/${id}`);
        // console.log(res);
        setService(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getServiceById();
  }, [id]);

  return (
    <main className="u-container">
      <h1>Editar Servicio</h1>
      {!!service && (
        <div className="edit-service-info rounded-5">
          <h4>
            {service.id} - {service.nombre}
          </h4>
          <p>
            <b>Descripción: </b> {service.descripcion}
          </p>
          <p>
            <b>Costo:</b> ${service.costo}
          </p>
          <p>
            <b>Categoría:</b> {service.categoria}
          </p>
          <p>
            <b>Disponible:</b> {service.disponible ? "Sí" : "No"}
          </p>
        </div>
      )}
      {!!service && <EditServiceForm service={service} />}
    </main>
  );
};

export default AdminEditService;
