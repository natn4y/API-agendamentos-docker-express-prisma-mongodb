import { Router } from 'express';

import { CreateSalonController } from '@modules/salon/useCases/CreateSalon/CreateSalonController';
import { ListAllSalonServicesController } from '@modules/salon/useCases/ListAllSalonServices/ListAllSalonServicesController';
import { ListSalonByIdController } from '@modules/salon/useCases/ListSalonById/ListSalonByIdController';

const salaoRoutes = Router();
const createSalaoController = new CreateSalonController();
const listAllSalaoServicesController = new ListAllSalonServicesController();
const listSalaoByIdController = new ListSalonByIdController();

salaoRoutes.post("/create", createSalaoController.handle);

salaoRoutes.get('/services/:salaoId', listAllSalaoServicesController.handle);

salaoRoutes.get('/:salaoId', listSalaoByIdController.handle);

export default salaoRoutes;
