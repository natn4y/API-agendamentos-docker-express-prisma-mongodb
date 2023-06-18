import { Request, Response } from 'express';

import { CreateSalonColaboradorUseCase } from './CreateSalonColaboradorUseCase';

class CreateSalonCollaboratorController {
  async handle(request: Request, response: Response) {
    const {
      salaoId,
      colaboradorId,
      status,
    } = request.body;

    try {
      const createSalaoColaboradorUseCase = new CreateSalonColaboradorUseCase();

      await createSalaoColaboradorUseCase.execute({
        salaoId,
        colaboradorId,
        status,
      });

      return response.status(200).json({ message: 'Salão Collaborators cadastrado com sucesso!' });

    } catch (error) {
      console.log('Erro ao cadastrar Salão Collaborators');
      return response.status(409).json({ error: 'Salão Collaborators já existe' });
    }
  }
}

export { CreateSalonCollaboratorController };
