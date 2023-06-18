import { Request, Response } from 'express';
import { CreateCollaboratorUseCase } from './CreateCollaboratorUseCase';

class CreateCollaboratorController {
  async handle(request: Request, response: Response) {
    const {
      colaborador,
      salaoId,
    } = request.body;

    try {
      const createColaboradorUseCase = new CreateCollaboratorUseCase();
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

export { CreateCollaboratorController };
