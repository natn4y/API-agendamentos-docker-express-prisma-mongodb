import { Request, Response } from 'express';
import { ListHorarioByIdUseCase } from './ListHorarioByIdUseCase';

export class ListHorarioByIdController {
  async handle(request: Request, response: Response) {
    const listHorarioByIdUseCase = new ListHorarioByIdUseCase();

    const { horarioId } = request.params;

    try {
      const horario = await listHorarioByIdUseCase.execute(horarioId);
      response.status(200).json(horario);
    } catch (error) {
      console.log(error);
      response.status(500).send('Ocorreu um erro ao tentar listar os horários');
    }
  }
}
