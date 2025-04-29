import citasController from '../controllers/citas.controller.js';
import express from 'express';
const citasRoutes = express.Router();

citasRoutes
.post('/saveCita', citasController.saveCita)
.delete('/deleteCita', citasController.deleteCita)

export default citasRoutes;
