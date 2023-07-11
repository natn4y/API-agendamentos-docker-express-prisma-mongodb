import { Request, Response } from 'express';
import { ListAllSalonColaboratorUseCase } from './ListAllSalonColaboratorUseCase';

class ListAllSalonCollaboratorController {
  async handle(request: Request, response: Response) {
    const { salaoId } = request.params;

    const listAllSalonColaboratorUseCase = new ListAllSalonColaboratorUseCase();

    try {
      const salons = await listAllSalonColaboratorUseCase.execute(salaoId);

      return response.status(200).json(salons);
    } catch (error) {
      return response.status(500).json({error: 'Erro ao listar salons'})
    }
  }
}

export { ListAllSalonCollaboratorController }