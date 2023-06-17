import { Router } from 'express';
import { CreateHorarioController } from '../modules/horario/useCases/CreateHorario/CreateHorarioController';

const horarioRoutes = Router();
const createHorarioController = new CreateHorarioController();

horarioRoutes.post("/", createHorarioController.handle);

export default horarioRoutes;
