import React, { useContext } from "react";
import ProfileInfo from "../components/DashBoardComponents/ProfileInfo";
import ServicesBought from "../components/DashBoardComponents/ServicesBought";

const DashBoardPage = () => {
  return (
    <main className="u-container">
      <h1>Panel de Perfil</h1>
      <ProfileInfo />
      <ServicesBought />
    </main>
  );
};

export default DashBoardPage;
