import { Router } from 'express';
import { CreateCollaboratorServicesController } from '../modules/collaborator_services/useCases/CreateCollaboratorServices/CreateCollaboratorServicesController';

const ColaboradorServicesRoutes = Router();
const createContaBancariaController = new CreateCollaboratorServicesController();

ColaboradorServicesRoutes.post("/create", createContaBancariaController.handle);

export default ColaboradorServicesRoutes;
