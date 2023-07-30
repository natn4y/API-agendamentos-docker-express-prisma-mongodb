import { Request, Response } from 'express';
import { FilterAgendamentoUseCase } from './FilterAgendamentoUseCase';

export class FilterAgendamentoController {
  async handle(request: Request, response: Response) {
    const { periodo, salaoId } = request.body;

    try {
      const filterAgendamentoUseCase = new FilterAgendamentoUseCase();

      const agendamento = await filterAgendamentoUseCase.execute({ periodo, salaoId });

      response.status(200).json(agendamento);
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: 'An error occurred' });
    }
  }
}
