import { CreateAgendamentoController } from '@modules/agendamento/UseCases/CreateAgendamento/CreateAgendamentoController';
import { DiasDisponiveisController } from '@modules/agendamento/UseCases/DiasDisponiveis/DiasDisponiveisController';
import { FilterAgendamentoController } from '@modules/agendamento/UseCases/FilterAgendamento/FilterAgendamentoController';
import { Router } from 'express';

const AgendamentoRoutes = Router();
const createAgendamentoController = new CreateAgendamentoController();
const filterAgendamentoController = new FilterAgendamentoController();
const diasDisponiveisController = new DiasDisponiveisController();

AgendamentoRoutes.post("/create", createAgendamentoController.handle);
AgendamentoRoutes.post("/filter", filterAgendamentoController.handle);
AgendamentoRoutes.post("/diasDisponiveis", diasDisponiveisController.handle);

export default AgendamentoRoutes;
