import { Request, Response } from 'express';
import { CreateHorarioUseCase } from './CreateHorarioUseCase';

export class CreateHorarioController {
  async handle(request: Request, response: Response) {
    const {
      salaoId,
      especialidades,
      collaborators,
      dias,
      inicio,
      fim,
    } = request.body;

    try {
      const createHorarioUseCase = new CreateHorarioUseCase();

      await createHorarioUseCase.execute({
        salaoId,
        especialidades,
        collaborators,
        dias,
        inicio,
        fim,
      });

      console.log(createHorarioUseCase);

      return response.status(200).json({ message: 'Horário cadastrado com sucesso!' });
    } catch (error) {
      return response.status(409).json({ message: 'Erro ao cadastrar horário' });
    }
  }
}
