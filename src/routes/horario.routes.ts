import { Router } from 'express';

import { CreateHorarioController } from '@modules/horario/useCases/CreateHorario/CreateHorarioController';
import { DeleteHorarioByIdController } from '@modules/horario/useCases/DeleteHorarioById/DeleteHorarioByIdController';
import { ListHorarioByIdController } from '@modules/horario/useCases/ListHorarioById/ListHorarioByIdController';
import { AlterarHorarioController } from '@modules/horario/useCases/AlterarHorario/AlterarHorarioController';

const horarioRoutes = Router();
const createHorarioController = new CreateHorarioController();
const deleteHorarioByIdController = new DeleteHorarioByIdController();
const listHorarioByIdController = new ListHorarioByIdController();
const alterarHorarioController = new AlterarHorarioController();

horarioRoutes.post("/", createHorarioController.handle);
horarioRoutes.delete("/delete/:horarioId", deleteHorarioByIdController.handle);
horarioRoutes.get("/listHorarioById/:horarioId", listHorarioByIdController.handle);
horarioRoutes.put("/updateHorarioById/:horarioId", alterarHorarioController.handle);

export default horarioRoutes;
