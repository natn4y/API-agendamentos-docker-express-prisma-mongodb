import { Request, Response } from 'express';
import { CreateColaboradorUseCase } from './CreateColaboradorUseCase';

class CreateColaboradorController {
  async handle(request: Request, response: Response) {
    const {
      colaborador,
      salaoId,
    } = request.body;

    try {
      const createColaboradorUseCase = new CreateColaboradorUseCase();
      await createColaboradorUseCase.execute({
        colaborador,
        salaoId,
      });
      return response.status(200).json({ message: 'Colaborador cadastrado com sucesso!' });
    } catch (error) {
      console.log('Erro ao cadastrar Colaborador');
      return response.status(409).json({ error: 'Colaborador já existe' });
    }
  }
}

export { CreateColaboradorController };
