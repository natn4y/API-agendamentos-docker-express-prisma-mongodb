import { Router } from 'express';
import { CreateServiceController } from '../modules/servicos/useCases/CreateServico/CreateServiceController';

const serviceRoutes = Router();
const createServiceController = new CreateServiceController();

serviceRoutes.post("/create", createServiceController.handle);

export default serviceRoutes;
