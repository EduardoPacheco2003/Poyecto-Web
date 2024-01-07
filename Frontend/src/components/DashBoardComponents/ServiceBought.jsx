import React from "react";

const ServiceBought = ({ service }) => {
  const { id_Venta, id_detalleVenta, servicio_Comprado } = service;

  const boughtDate = new Date(service.fecha_Compra);
  const day = boughtDate.getDate();
  const month = boughtDate.getMonth() + 1; // Los meses comienzan desde 0
  const year = boughtDate.getFullYear();
  const hours = boughtDate.getHours();
  const minutes = boughtDate.getMinutes();
  const seconds = boughtDate.getSeconds();

  return (
    <section>
      <p>
        No. de Venta: {id_Venta} - {id_detalleVenta}
      </p>
      <p>{servicio_Comprado}</p>
      <p>
        Fecha de compra: {day}/{month}/{year} - {hours}:{minutes}:{seconds}
      </p>
    </section>
  );
};

export default ServiceBought;
