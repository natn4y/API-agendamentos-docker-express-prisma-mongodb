import { Request, Response } from 'express';
import { ListAllSalaoByUseCase } from './ListSalaoByIdUseCase';

class ListSalaoByIdController {
  async handle(request: Request, response: Response) {
    const { salaoId } = request.params;

    const listAllSalaoByUseCase = new ListAllSalaoByUseCase();

    try {
      const salao = await listAllSalaoByUseCase.execute(salaoId);

      return response.status(200).json(salao);
    } catch (error) {
      return response.status(500).json({error: 'Erro ao listar salao'})
    }
  }
}

export { ListSalaoByIdController }