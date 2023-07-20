import { Request, Response } from 'express';
import { DeleteHorarioByIdUseCase } from './DeleteHorarioByIdUseCase';

export class DeleteHorarioByIdController {
  async handle(request: Request, response: Response) {
    const { horarioId } = request.params;

    try {
      const deleteHorarioByIdUseCase = new DeleteHorarioByIdUseCase()

      deleteHorarioByIdUseCase.execute(horarioId)

      response.status(200).json("Horário deletado com sucesso!")
    } catch (error) {
      response.status(500).json("Ocorreu um erro no servidor ao tentar deletar horário")
    }
  }
}