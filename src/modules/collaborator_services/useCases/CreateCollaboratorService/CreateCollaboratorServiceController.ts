import { Request, Response } from 'express';

import { CreateCollaboratorServiceUseCase } from './CreateCollaboratorServiceUseCase';

class CreateCollaboratorServiceController {
  async handle(request: Request, response: Response) {
    const createCollaboratorServiceController = new CreateCollaboratorServiceUseCase();

    const {
      colaboradorId,
      servicoId,
      salaoId,
      status,
    } = request.body;

    try {
      await createCollaboratorServiceController.execute({
        colaboradorId,
        servicoId,
        salaoId,
        status,
      });

      return response.status(200).json({ message: 'Colaborador cadastrado com sucesso!' });
    } catch (error: unknown) {
      return response.status(409).json({ error: 'Colaborador already exists' });
    }
  }
}

export { CreateCollaboratorServiceController };
