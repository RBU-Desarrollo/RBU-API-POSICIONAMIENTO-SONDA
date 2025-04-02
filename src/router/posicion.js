import { Router } from "express";
import { testConnection } from "../controllers/posicion.js";
import { PORT } from '../config/env.js'
const router = Router();

router.get('/testConnection', (req, res) => res.status(202).json({ message: 'Servicio corriendo en puerto', PORT }));
router.get("/insPosicionamiento", testConnection);

export default router;
