import { Router } from 'express';

import { CreateClientController } from '@modules/clients/useCases/CreateClient/CreateClientController';

const ClientRoutes = Router();
const createClientController = new CreateClientController();

ClientRoutes.post("/create", createClientController.handle);

export default ClientRoutes;
