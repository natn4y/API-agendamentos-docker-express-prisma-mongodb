import { Request, Response } from 'express';
import { CreateSalaoColaboradorUseCase } from './CreateSalaoColaboradorUseCase';

class CreateSalaoColaboradorController {
  async handle(request: Request, response: Response) {
    const {
      salaoId,
      colaboradorId,
      status,
    } = request.body;

    try {
      const createSalaoColaboradorUseCase = new CreateSalaoColaboradorUseCase();

      await createSalaoColaboradorUseCase.execute({
        salaoId,
        colaboradorId,
        status,
      });

      return response.status(200).json({ message: 'Salão Colaborador cadastrado com sucesso!' });

    } catch (error) {
      console.log('Erro ao cadastrar Salão Colaborador');
      return response.status(409).json({ error: 'Salão Colaborador já existe' });
    }
  }
}

export { CreateSalaoColaboradorController };
