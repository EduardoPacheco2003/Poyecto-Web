import { pool } from "../db.js";

export const getPendingSales = async (req, res) => {
  //Solicitamos las ventas pendientes al pool
  try {
    const [result] = await pool.query(
      "SELECT vs.id, u.correo FROM venta_servicios vs LEFT JOIN usuarios u ON u.Id = vs.Id_Usuario  WHERE vs.Pendiente = 1;"
    );

    return res.status(200).json({ pendingSales: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPendingSaleById = async (req, res) => {
  const id = req.params.id;
  //Solicitamos la venta pendiente al pool
  try {
    const [result] = await pool.query("CALL sp_DetalleVentaPendiente(?);", [
      id,
    ]);
    return res.status(200).json({ pendingSale: result[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const putCompleteSale = async (req, res) => {
  const id = req.params.id;
  //Completamos la venta pendiente
  try {
    await pool.query("CALL sp_CompletarVenta(?);", [id]);
    return res.status(200).json({ message: "Venta completada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
