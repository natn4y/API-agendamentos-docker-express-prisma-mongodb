import { Request, Response } from 'express';
import { CreateCollaboratorServicesUseCase } from './CreateCollaboratorServicesUseCase';

class CreateCollaboratorServicesController {
  async handle(request: Request, response: Response) {
    const createCollaboratorServicesController = new CreateCollaboratorServicesUseCase();

    const {
      colaboradorId,
      servicoId,
      status,
    } = request.body;

    try {
      await createCollaboratorServicesController.execute({
        colaboradorId,
        servicoId,
        status,
      });

      return response.status(200).json({ message: 'Colaborador cadastrado com sucesso!' });
    } catch (error: unknown) {
      return response.status(409).json({ error: 'Colaborador already exists' });
    }
  }
}

export { CreateCollaboratorServicesController };
