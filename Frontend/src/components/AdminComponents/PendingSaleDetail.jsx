import React from "react";

const PendingSaleDetail = ({ saleDetail }) => {
  const { nombre, cantidad } = saleDetail;
  return (
    <div>
      <h4>
        Servicio: {nombre} - Cantidad: [{cantidad}]
      </h4>
    </div>
  );
};

export default PendingSaleDetail;
