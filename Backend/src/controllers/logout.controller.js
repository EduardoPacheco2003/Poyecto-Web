import config from "../config.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const postLogout = async (req, res) => {
  const { myToken } = req.cookies;
  if (!myToken) {
    return res.status(404).json({ message: "No hay token" });
  }

  try {
    const { email, username, id } = jwt.verify(myToken, config.jwtSecret);

    // Serializar y establecer la cookie con el paquete "cookie"
    const serializedToken = cookie.serialize("myToken", null, {
      httpOnly: true,
      secure: "production", // config.env === "production"
      maxAge: 0, // 0
      sameSite: "none",
    });

    // Establecer la cookie
    res.setHeader("Set-Cookie", serializedToken);

    return res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    return res.status(401).json({ message: "Token no válido" });
  }
};
