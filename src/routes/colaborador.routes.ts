import { Router } from 'express';

import { CreateCollaboratorController } from '@modules/collaborator/useCases/CreateCollaborator/CreateCollaboratorController';
import { AlterarCollaboratorController } from '@modules/salon_collaborators/useCases/AlterarColaborador/AlterarCollaboratorController';
import { FilterColaboradorController } from '@modules/collaborator/useCases/FilterColaborador/FilterColaboradorController';

const colaboradorRoutes = Router();
const createColaboradorController = new CreateCollaboratorController();
const alterarColaboradorController = new AlterarCollaboratorController();
const filterColaboradorController = new FilterColaboradorController();

colaboradorRoutes.post("/create", createColaboradorController.handle);

colaboradorRoutes.put("/:colaboradorId", alterarColaboradorController.handle);

colaboradorRoutes.post("/filter", filterColaboradorController.handle);

export default colaboradorRoutes;
