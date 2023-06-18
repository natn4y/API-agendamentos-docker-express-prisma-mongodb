import { Router } from 'express';
import { CreateContaBancariaController } from '../modules/contaBancaria/useCases/CreateContaBancariaController';

const ContaBancariaRoutes = Router();
const createContaBancariaController = new CreateContaBancariaController();

ContaBancariaRoutes.post("/create", createContaBancariaController.handle);

export default ContaBancariaRoutes;
