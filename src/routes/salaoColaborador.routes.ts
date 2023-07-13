import { Router } from 'express';

import { CreateSalonCollaboratorController } from '@modules/salon_collaborators/useCases/CreateSalonColaborador/CreateSalonCollaboratorController';
import { ListAllSalonCollaboratorController } from '@modules/salon_collaborators/useCases/ListAllSalonCollaborator/ListAllSalonCollaboratorController';

const salaoColaboradorRoutes = Router();
const createSalaoColaboradorController = new CreateSalonCollaboratorController();
const listAllColaboratorController = new ListAllSalonCollaboratorController();

salaoColaboradorRoutes.post("/create/", createSalaoColaboradorController.handle);

salaoColaboradorRoutes.get("/listAllSalon", listAllColaboratorController.handle);

export default salaoColaboradorRoutes;
