import express from "express";
import posicionRoutes from "./router/posicion.js";

const app = express();

app.use("/api", posicionRoutes);

export default app;
