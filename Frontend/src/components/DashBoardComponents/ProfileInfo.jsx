import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfileInfo = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const logout = async () => {
    await logoutUser();
  };

  return (
    <article>
      <h2>Datos del Perfil:</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={logout}>Logout</button>
    </article>
  );
};

export default ProfileInfo;
