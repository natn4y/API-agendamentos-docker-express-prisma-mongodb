import { Request, Response } from 'express';
import { ListAllSalonServiceUseCase } from './ListAllSalonServicesUseCase';

class ListAllSalonServicesController {
  async handle(request: Request, response: Response) {
    const { salaoId } = request.params;

    const listAllSalonServicesUseCase = new ListAllSalonServiceUseCase();

    try {
      const services = await listAllSalonServicesUseCase.execute(salaoId);
      return response.status(200).json(services);
    } catch (error) {
      console.log('Erro ao listar serviços:', error);
      return response.status(500).json({ error: 'Erro ao listar serviços' });
    }
  }
}

export { ListAllSalonServicesController };
