import { pool } from "../db.js";

export const getServices = async (req, res) => {
  try {
    let [result] = await pool.query(
      "SELECT s.id, s.Nombre, s.Descripcion, s.Imagen, cs.Nombre as Categoria , s.Disponible, s.Costo, s.NumVecesComprado FROM servicios s LEFT JOIN categorias_servicios cs  ON s.Id_Categoria = cs.Id;"
    );

    result = result.map((service) => {
      return {
        ...service,
        Disponible: service.Disponible === 1 ? true : false,
      };
    });

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
