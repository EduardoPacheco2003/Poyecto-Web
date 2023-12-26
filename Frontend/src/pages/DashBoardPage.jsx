import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashBoardPage = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const logout = async () => {
    await logoutUser();
  };

  return (
    <main>
      <h1>Panel de Perfil</h1>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
      <button onClick={logout}>Logout</button>
    </main>
  );
};

export default DashBoardPage;
