import { Request, Response } from 'express';
import { ListAllSalonBySatusNotEorExcluidoUseCase } from './ListAllSalonBySatusNotEorExcluidoUseCase';

export class ListAllSalonBySatusNotEorExcluidoController {
  async handle(request: Request, response: Response) {
    try {
      const { salaoId } = request.params;

      const listAllSalonBySatusNotEorExcluidoUseCase = new ListAllSalonBySatusNotEorExcluidoUseCase()

      const salons = await listAllSalonBySatusNotEorExcluidoUseCase.execute(salaoId)

      response.status(200).json(salons);
    } catch (error) {
      response.status(500).json(error);
    }
  }
}