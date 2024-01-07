import React, { useState } from "react";
import PendingSales from "../components/AdminComponents/PendingSales";
import EditServices from "../components/AdminComponents/EditServices";

const AdminPage = () => {
  const [editServices, setEditServices] = useState(false);

  const onEditServices = () => {
    setEditServices(!editServices);
  };

  return (
    <main>
      <h1>Admin Page</h1>
      <nav className="u-container edit-service-nav">
        <button onClick={onEditServices}>Editar Servicios</button>
        <button onClick={onEditServices}>Ver ventas pendientes</button>
      </nav>
      {!editServices && <PendingSales />}
      {editServices && <EditServices />}
    </main>
  );
};

export default AdminPage;
