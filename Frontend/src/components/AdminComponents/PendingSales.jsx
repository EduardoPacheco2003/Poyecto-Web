import axios from "axios";
import React, { useEffect, useState } from "react";
import PendingSale from "./PendingSale";

const PendingSales = () => {
  const [pendingSales, setPendingSales] = useState([]);

  useEffect(() => {
    const getPendingSales = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/sales/pending"
      );
      const { pendingSales } = response.data;
      setPendingSales(pendingSales);
    };

    getPendingSales();
  }, []);

  const completeSale = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/sales/pending/${id}`
      );
      console.log(res.data);
      if (res.status === 200) {
        const newPendingSales = [...pendingSales].filter(
          (sale) => sale.id !== id
        );
        setPendingSales(newPendingSales);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="u-container">
      <h2>Ventas Pendientes</h2>
      {pendingSales.length > 0 &&
        pendingSales.map((sale) => (
          <PendingSale key={sale.id} sale={sale} completeSale={completeSale} />
        ))}
    </section>
  );
};

export default PendingSales;
