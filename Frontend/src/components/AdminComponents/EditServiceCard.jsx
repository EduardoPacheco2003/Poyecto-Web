import React from "react";

const EditServiceCard = ({
  service,
  changeAvailability,
  onEditService,
  onDeleteService,
}) => {
  const { id, Nombre, Descripcion, Costo, Disponible } = service;
  return (
    <article className="edit-service-card">
      <div className="edit-service-info">
        <h4>
          {id} - {Nombre}
        </h4>
        <p>
          <b>Descripción: </b> {Descripcion}
        </p>
        <p>
          <b>Categoría:</b> {service.Categoria}
        </p>
        <p>
          <b>Costo:</b> ${Costo}
        </p>
        <p>
          <b>Disponible:</b> {Disponible ? "Sí" : "No"}
        </p>
      </div>
      <div className="edit-service-buttons">
        <button onClick={() => changeAvailability(id)}>
          Cambiar Disponibilidad de Servicio
        </button>
        <button onClick={() => onEditService(id)}>Editar Servicio</button>
        <button onClick={() => onDeleteService(id)}>Eliminar Servicio</button>
      </div>
    </article>
  );
};

export default EditServiceCard;
