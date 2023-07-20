import { Request, Response } from 'express';
import { CreateHorarioUseCase } from './CreateHorarioUseCase';

export class CreateHorarioController {
  async handle(request: Request, response: Response) {
    const {
      salaoId,
      especialidadesIds,
      colaboradoresIds,
      dias,
      inicio,
      fim,
    } = request.body;

    try {
      const createHorarioUseCase = new CreateHorarioUseCase();

      await createHorarioUseCase.execute({
        salaoId,
        especialidadesIds,
        colaboradoresIds,
        dias,
        inicio,
        fim,
      });

      //console.log(createHorarioUseCase);

      return response.status(200).json({ error: 'Horário cadastrado com sucesso!' });
    } catch (error) {
      return response.status(409).json({ error: 'esses colaboradores já estão cadastrados para esse horário' });
    }
  }
}
