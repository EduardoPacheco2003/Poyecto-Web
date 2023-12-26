import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const getRegister = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT 'pong' AS result");
    res.json(result[0]);
  } catch (error) {
    console.log(error);
    res.json({ message: "Error en la base de datos" });
  }
};

export const postRegister = async (req, res) => {
  const { username, password, nombre, apellidos, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    //Verificar si el usuario ya existe
    const [rows] = await pool.query(
      "SELECT * FROM Usuarios WHERE username = ? OR correo = ?",
      [username, email]
    );

    if (rows.length > 0) {
      const error = {
        mensaje: "El usuario o correo ya existe",
        exito: false,
        ErrorSQL: null,
      };
      throw error;
    }

    //Insertar usuario en la base de datos
    const [result] = await pool.query(
      "CALL sp_RegistrarUsuario(?, ?, ?, ?, ?)",
      [username, hashedPassword, nombre, apellidos, email]
    );

    const { Mensaje, exito, ErrorSQL } = result[0][0];

    //Si hay error
    if (!exito) {
      const error = { mensaje: Mensaje, exito: false, ErrorSQL };
      throw error;
    }

    return res.json({
      message: "Usuario creado",
      exito: true,
      username,
      nombre,
      apellidos,
      email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.mensaje, exito: error.exito });
  }
};
