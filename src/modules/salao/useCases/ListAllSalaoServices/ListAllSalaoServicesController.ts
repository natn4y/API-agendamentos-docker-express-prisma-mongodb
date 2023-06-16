import { Request, Response } from 'express';
import { ListAllSalaoServicesUseCase } from './ListAllSalaoServicesUseCase';

class ListAllSalaoServicesController {
  async handle(request: Request, response: Response) {
    const { salaoId } = request.params;
    const listAllSalaoServicesUseCase = new ListAllSalaoServicesUseCase();

    try {
      const servicos = await listAllSalaoServicesUseCase.execute(salaoId);
      return response.status(200).json(servicos);
    } catch (error) {
      console.log('Erro ao listar serviços:', error);
      return response.status(500).json({ error: 'Erro ao listar serviços' });
    }
  }
}

export { ListAllSalaoServicesController };
