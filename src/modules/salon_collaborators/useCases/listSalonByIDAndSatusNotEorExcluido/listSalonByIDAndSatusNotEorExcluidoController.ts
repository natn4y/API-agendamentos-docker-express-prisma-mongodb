import { Request, Response } from 'express';
import { ListSalonByIDAndStatusNotEorExcluidoUseCase } from './listSalonByIDAndSatusNotEorExcluidoUseCase';

export class ListSalonByIDAndSatusNotEorExcluidoController {
  async handle(request: Request, response: Response) {
    try {
      const { salaoId } = request.params;

      const listSalonByIDAndSatusNotEorExcluidoUseCase = new ListSalonByIDAndStatusNotEorExcluidoUseCase()

      const salons = await listSalonByIDAndSatusNotEorExcluidoUseCase.execute(salaoId)

      response.status(200).json(salons);
    } catch (error) {
      response.status(500).json(error);
    }
  }
}