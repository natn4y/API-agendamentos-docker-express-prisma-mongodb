import { Request, Response } from 'express';
import { AlterarHorarioUseCase } from './AlterarHorarioUseCase';

export class AlterarHorarioController {
  async handle(request: Request, response: Response) {
    const { horarioId } = request.params;
    const { horario } = request.body;
    console.log(horarioId);
    console.log(horario);
    try {
      const alterarHorarioUseCase = new AlterarHorarioUseCase();

      await alterarHorarioUseCase.execute({ horarioId, horario });

      response.status(200).json("Horário alterado com sucesso");
    } catch (error) {
      console.log(error);
      response.status(500).json("Ocorreu um erro no servidor ao tentar alterar o horário");
    }
  }
}
