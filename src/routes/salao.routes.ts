import { Router } from 'express';
import { CreateSalaoController } from '../modules/salao/useCases/CreateSalao/CreateSalaoController';
import { ListAllSalaoServicesController } from '../modules/salao/useCases/ListAllSalaoServices/ListAllSalaoServicesController';
import { ListSalaoByIdController } from '../modules/salao/useCases/ListSalaoById/ListSalaoByIdController';

const salaoRoutes = Router();
const createSalaoController = new CreateSalaoController();
const listAllSalaoServicesController = new ListAllSalaoServicesController();
const listSalaoByIdController = new ListSalaoByIdController();

salaoRoutes.post("/create", createSalaoController.handle);

salaoRoutes.get('/servicos/:salaoId', listAllSalaoServicesController.handle);

salaoRoutes.get('/:salaoId', listSalaoByIdController.handle);

export default salaoRoutes;
