import { Router } from 'express';

import { CreateCollaboratorServiceController } from '@modules/collaborator_services/useCases/CreateCollaboratorService/CreateCollaboratorServiceController';

const ColaboradorServicesRoutes = Router();
const createContaBancariaController = new CreateCollaboratorServiceController();

ColaboradorServicesRoutes.post("/create", createContaBancariaController.handle);

export default ColaboradorServicesRoutes;
