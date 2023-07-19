import { Router } from 'express';

import { CreateSalonCollaboratorController } from '@modules/salon_collaborators/useCases/CreateSalonColaborador/CreateSalonCollaboratorController';
import { ListAllSalonCollaboratorController } from '@modules/salon_collaborators/useCases/ListAllSalonCollaborator/ListAllSalonCollaboratorController';
import { AlterarStatusSalonCollaboratorController } from '@modules/salon_collaborators/useCases/AlterarStatusSalonCollaborator/AlterarStatusSalonCollaboratorController';
import { ListAllSalonBySatusNotEorExcluidoController } from '@modules/salon_collaborators/useCases/ListAllSalonBySatusNotEorExcluido/ListAllSalonBySatusNotEorExcluidoController';

const salaoColaboradorRoutes = Router();
const createSalaoColaboradorController = new CreateSalonCollaboratorController();
const listAllColaboratorController = new ListAllSalonCollaboratorController();
const alterarStatusSalonCollaboratorController = new AlterarStatusSalonCollaboratorController()
const listAllSalonBySatusNotEorExcluidoController = new ListAllSalonBySatusNotEorExcluidoController();

salaoColaboradorRoutes.post("/create/", createSalaoColaboradorController.handle);

salaoColaboradorRoutes.get("/listAllSalon", listAllColaboratorController.handle);

salaoColaboradorRoutes.delete('/:id', alterarStatusSalonCollaboratorController.handle);

salaoColaboradorRoutes.get("/listAllSalonBySatusNotEorExcluido", listAllSalonBySatusNotEorExcluidoController.handle);

export default salaoColaboradorRoutes;
