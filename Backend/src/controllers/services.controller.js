import e from "express";
import { pool } from "../db.js";

// GET
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
export const getServicesByCustomer = async (req, res) => {
  const id = req.params.id;

  try {
    let [result] = await pool.query("CALL sp_Servicios_x_Cliente (?)", [id]);

    return res.status(200).json({ services: result[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getServicesCategories = async (req, res) => {
  try {
    let [result] = await pool.query(
      "SELECT id, nombre FROM categorias_servicios"
    );
    return res.status(200).json({ categories: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getServiceById = async (req, res) => {
  const id = req.params.id;

  try {
    let [result] = await pool.query(
      "SELECT s.id, s.nombre, s.descripcion, s.imagen, cs.nombre as categoria , s.disponible, s.costo, s.numVecesComprado FROM servicios s LEFT JOIN categorias_servicios cs  ON s.Id_Categoria = cs.Id WHERE s.id = ?",
      [id]
    );

    result = result.map((service) => {
      return {
        ...service,
        disponible: service.disponible === 1 ? true : false,
      };
    });

    return res.json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST
export const postBuyService = async (req, res) => {
  try {
    // console.log(req.body);
    const { cart, totalCost, user } = req.body;
    const userId = user.id;
    const telContacto = user.telContacto;
    let newCart = cart.map(({ id, cantidad, Costo }) => {
      let subTotal = cantidad * parseFloat(Costo);
      subTotal = parseFloat(subTotal.toFixed(2));
      return {
        id,
        cantidad,
        subTotal,
      };
    });

    newCart = JSON.stringify(newCart);
    let [result] = await pool.query("CALL sp_ComprarServicios (?, ?, ?, ?)", [
      userId,
      newCart,
      telContacto,
      totalCost,
    ]);
    // console.log("RESULT:", result[0]);
    return res.json({
      message: "Servicio(s) comprado(s) exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const postNewService = async (req, res) => {
  // console.log(req.body);
  const { name, description, imgLink, price, category, available } = req.body;

  const categoryId = parseInt(category);
  const availableService = available ? 1 : 0;

  let cost = parseFloat(price).toFixed(2);
  cost = parseFloat(cost);

  try {
    const [result] = await pool.query(
      "CALL sp_InsertarNuevoServicio (?, ?, ?, ?, ?, ?)",
      [name, description, imgLink, categoryId, cost, availableService]
    );
    const { mensaje, exito } = result[0][0];

    if (exito === 0) throw new Error(mensaje);

    return res.json({ message: "Servicio creado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUT
export const putService = async (req, res) => {
  const { id } = req.params;
  const { name, description, imgLink, price, category, available } = req.body;

  const categoryId = parseInt(category);
  const availableService = available ? 1 : 0;

  let cost = parseFloat(price).toFixed(2);
  cost = parseFloat(cost);

  try {
    const [result] = await pool.query(
      "CALL sp_ActualizarServicio (?, ?, ?, ?, ?, ?, ?)",
      [id, name, description, imgLink, categoryId, cost, availableService]
    );
    const { mensaje, exito } = result[0][0];

    if (exito === 0) throw new Error(mensaje);

    return res.json({ message: "Servicio actualizado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//PATCH
export const patchServiceAvailability = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "CALL sp_CambiarDisponibilidadServicio (?)",
      [id]
    );
    const { mensaje, exito } = result[0][0];

    const succes = exito === 1 ? true : false;
    if (!succes) throw new Error(mensaje);
    return res.json({ message: mensaje, succes: succes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// DELETE

export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("CALL sp_EliminarServicio (?)", [id]);
    const { mensaje, exito } = result[0][0];

    const succes = exito === 1 ? true : false;
    if (!succes) throw new Error(mensaje);
    return res.json({ message: mensaje, succes: succes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
