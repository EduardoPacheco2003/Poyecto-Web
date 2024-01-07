import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import cookie from "cookie";

export const getAuth = async (req, res) => {
  const { myToken } = req.cookies;
  if (!myToken) {
    return res.status(401).json({ message: "No hay token" });
  }

  jwt.verify(myToken, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }
    // console.log(decoded);
    const { id, username, email, userRole } = decoded;
    return res.json({ id, username, email, userRole: [userRole] });
  });
};

export const postAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Verificar si el usuario existe
    const [rows] = await pool.query(
      "SELECT u.id, u.username, u.correo, u.password, r.nombre_Rol FROM Usuarios u JOIN roles r ON u.Id_rol = r.ID WHERE correo = ?",
      [email]
    );
    //Si no existe el usuario
    if (rows.length === 0) {
      const error = {
        mensaje: "El usuario no existe",
        exito: false,
        ErrorSQL: null,
      };
      throw error;
    }
    console.log(rows[0]);
    const {
      id,
      username,
      correo,
      password: hashedPassword,
      nombre_Rol: userRole,
    } = rows[0];

    //Si existe el usuario, verificar la contraseña
    const matchPassword = await bcrypt.compare(password, hashedPassword);

    if (!matchPassword) {
      const error = {
        mensaje: "Usuario o Contraseña incorrectos",
        exito: false,
        ErrorSQL: null,
      };
      throw error;
    }

    //Si la contraseña es correcta, generar token
    const token = jwt.sign(
      {
        id,
        username,
        email: correo,
        userRole,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week
      },
      config.jwtSecret
    );
    // Serializar y establecer la cookie con el paquete "cookie"
    const serializedToken = cookie.serialize("myToken", token, {
      httpOnly: true,
      secure: "production", // config.env === "production"
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "none",
    });
    res.setHeader("Set-Cookie", serializedToken);

    return res.json("Logeando usuario con cookie");
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: error.mensaje, exito: error.exito });
  }
};
