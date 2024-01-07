import axios from "axios";
import React, { useState } from "react";
import PendingSaleDetail from "./PendingSaleDetail";

const PendingSale = ({ sale, completeSale }) => {
  const [saleDetail, setSaleDetail] = useState([]);

  const pendingSaleDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/sales/pending/${sale.id}`
      );
      const { pendingSale } = res.data;
      setSaleDetail(pendingSale);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="pending-sale">
      <h3>
        {sale.id} - Correo de contacto: {sale.correo}
      </h3>
      <button onClick={() => completeSale(sale.id)}>Completar Venta</button>
      <button onClick={pendingSaleDetails}>Ver Detalles de la venta</button>
      {saleDetail.length > 0 &&
        saleDetail.map((saleDetail, idx) => (
          <PendingSaleDetail key={idx} saleDetail={saleDetail} />
        ))}
    </article>
  );
};

export default PendingSale;
