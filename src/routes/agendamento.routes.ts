import { CreateAgendamentoController } from '@modules/agendamento/UseCases/CreateAgendamento/CreateAgendamentoController';
import { FilterAgendamentoController } from '@modules/agendamento/UseCases/FilterAgendamento/FilterAgendamentoController';
import { Router } from 'express';

const AgendamentoRoutes = Router();
const createAgendamentoController = new CreateAgendamentoController();
const filterAgendamentoController = new FilterAgendamentoController();

AgendamentoRoutes.post("/create", createAgendamentoController.handle);
AgendamentoRoutes.post("/filter", filterAgendamentoController.handle);

export default AgendamentoRoutes;
