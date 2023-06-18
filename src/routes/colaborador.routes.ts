import { Router } from 'express';

import { CreateCollaboratorController } from '@modules/collaborator/useCases/CreateCollaborator/CreateCollaboratorController';
import { AlterarCollaboratorController } from '@modules/salon_collaborators/useCases/AlterarColaborador/AlterarCollaboratorController';

const colaboradorRoutes = Router();
const createColaboradorController = new CreateCollaboratorController();
const alterarColaboradorController = new AlterarCollaboratorController();

colaboradorRoutes.post("/create", createColaboradorController.handle);

colaboradorRoutes.put("/:colaboradorId", alterarColaboradorController.handle);

export default colaboradorRoutes;
