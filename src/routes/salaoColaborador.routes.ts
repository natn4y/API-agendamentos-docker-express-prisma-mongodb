import { Router } from 'express';

import { CreateSalonCollaboratorController } from '@modules/salon_collaborators/useCases/CreateSalonColaborador/CreateSalonCollaboratorController';

const salaoColaboradorRoutes = Router();
const createSalaoColaboradorController = new CreateSalonCollaboratorController();

salaoColaboradorRoutes.post("/create", createSalaoColaboradorController.handle);

export default salaoColaboradorRoutes;
