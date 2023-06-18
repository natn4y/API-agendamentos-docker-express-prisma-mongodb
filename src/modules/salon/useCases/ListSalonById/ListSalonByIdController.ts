import { Request, Response } from 'express';

import { ListSalonByIdUseCase } from './ListSalonByIdUseCase';

class ListSalonByIdController {
  async handle(request: Request, response: Response) {
    const { salaoId } = request.params;

    const listAllSalonByUseCase = new ListSalonByIdUseCase();

    try {
      const salons = await listAllSalonByUseCase.execute(salaoId);

      return response.status(200).json(salons);
    } catch (error) {
      return response.status(500).json({error: 'Erro ao listar salons'})
    }
  }
}

export { ListSalonByIdController }