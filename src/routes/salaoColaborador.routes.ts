import { Router } from 'express';
import { CreateSalaoColaboradorController } from '../modules/salaoColaborador/useCases/CreateSalaoColaborador/CreateSalaoColaboradorController';

const salaoColaboradorRoutes = Router();
const createSalaoColaboradorController = new CreateSalaoColaboradorController();

salaoColaboradorRoutes.post("/create", createSalaoColaboradorController.handle);

export default salaoColaboradorRoutes;
