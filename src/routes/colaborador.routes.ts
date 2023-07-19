import { Router } from 'express';

import { CreateCollaboratorController } from '@modules/collaborator/useCases/CreateCollaborator/CreateCollaboratorController';

import { FilterColaboradorController } from '@modules/collaborator/useCases/FilterColaborador/FilterColaboradorController';
import { AlterarCollaboratorController } from '@modules/salon_collaborators/useCases/AlterarSalonColaborador/AlterarSalonCollaboratorController';
// import { XAsdController } from '@modules/collaborator/useCases/XAsd/XAsdController';

const colaboradorRoutes = Router();
const createColaboradorController = new CreateCollaboratorController();
const alterarColaboradorController = new AlterarCollaboratorController();
const filterColaboradorController = new FilterColaboradorController();
//const deleteColaboradorController = new DeleteColaboradorController();
// const asd = new XAsdController()

colaboradorRoutes.post("/create", createColaboradorController.handle);

colaboradorRoutes.put("/:colaboradorId", alterarColaboradorController.handle);

colaboradorRoutes.post("/filter", filterColaboradorController.handle);

//colaboradorRoutes.post("/salao/:salaoId", asd.handle)


export default colaboradorRoutes;
