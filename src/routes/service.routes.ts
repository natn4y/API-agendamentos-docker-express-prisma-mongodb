import { Router } from 'express';

import { CreateServiceController } from '@modules/services/useCases/CreateService/CreateServiceController';

const serviceRoutes = Router();
const createServiceController = new CreateServiceController();

serviceRoutes.post("/create", createServiceController.handle);

export default serviceRoutes;
