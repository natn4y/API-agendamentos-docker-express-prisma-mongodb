import { CreateAgendamentoController } from '@modules/agendamento/UseCases/CreateAgendamento/CreateAgendamentoController';
import { DiasDisponiveisController } from '@modules/agendamento/UseCases/DiasDisponiveis/DiasDisponiveisController';
import { FilterAgendamentoController } from '@modules/agendamento/UseCases/FilterAgendamento/FilterAgendamentoController';
import { ListAgendamentosController } from '@modules/agendamento/UseCases/ListAgendamentos/ListAgendamentosController';
import { Router } from 'express';

const AgendamentoRoutes = Router();
const createAgendamentoController = new CreateAgendamentoController();
const filterAgendamentoController = new FilterAgendamentoController();
const diasDisponiveisController = new DiasDisponiveisController();
const listAgendamentosController = new ListAgendamentosController();

AgendamentoRoutes.post("/create", createAgendamentoController.handle);
AgendamentoRoutes.post("/filter", filterAgendamentoController.handle);
AgendamentoRoutes.post("/diasDisponiveis", diasDisponiveisController.handle);
AgendamentoRoutes.get("/listAgendamentos", listAgendamentosController.handle);
export default AgendamentoRoutes;
