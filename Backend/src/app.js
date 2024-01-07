import express from "express";
import config from "./config.js";
import { corsMiddleware } from "./middlewares/cors.js";
import cookieParser from "cookie-parser";
import servicesRoutes from "./routes/services.routes.js";
import authRoutes from "./routes/auth.routes.js";
import registerRoutes from "./routes/register.routes.js";
import logoutRoutes from "./routes/logout.routes.js";
import salesRoutes from "./routes/sales.routes.js";

const app = express();

//Server Settings
app.set("port", config.port);
app.disable("x-powered-by");

//middlewares
app.use(express.json());
app.use(corsMiddleware());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api", servicesRoutes);
app.use("/api", authRoutes);
app.use("/api", registerRoutes);
app.use("/api", logoutRoutes);
app.use("/api", salesRoutes);

//404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
