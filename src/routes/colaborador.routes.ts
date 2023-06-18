import { Router } from 'express';

import { CreateColaboradorController } from '@modules/colaborador/useCases/CreateColaborador/CreateColaboradorController';
import { AlterarColaboradorController } from '@modules/salaoColaborador/useCases/AlterarColaborador/AlterarColaboradorController';

const colaboradorRoutes = Router();
const createColaboradorController = new CreateColaboradorController();
const alterarColaboradorController = new AlterarColaboradorController();

colaboradorRoutes.post("/create", createColaboradorController.handle);

colaboradorRoutes.put("/:colaboradorId", alterarColaboradorController.handle);

export default colaboradorRoutes;
