import { Router } from 'express';
import { AlterarColaboradorController } from '../modules/salaoColaborador/useCases/AlterarColaborador/AlterarColaboradorController';
import { CreateColaboradorController } from '../modules/colaborador/useCases/CreateColaborador/CreateColaboradorController';


const colaboradorRoutes = Router();
const createColaboradorController = new CreateColaboradorController();
const alterarColaboradorController = new AlterarColaboradorController();

colaboradorRoutes.post("/create", createColaboradorController.handle);

colaboradorRoutes.put("/:colaboradorId", alterarColaboradorController.handle);

export default colaboradorRoutes;
