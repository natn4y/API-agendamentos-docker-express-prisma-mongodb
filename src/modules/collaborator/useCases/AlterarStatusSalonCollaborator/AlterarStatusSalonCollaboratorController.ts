import { Request, Response } from 'express';
import { AlterarStatusSalonCollaboratorUseCase } from './AlterarStatusSalonCollaboratorUseCase'

class AlterarStatusSalonCollaboratorController {
  async handle(request: Request, response: Response) {
    const {
      id,
    } = request.params;

    try {
      const alterarStatusSalonCollaboratorUseCase = new AlterarStatusSalonCollaboratorUseCase();

      await alterarStatusSalonCollaboratorUseCase.execute(id);

      return response.status(200).json({ message: 'Salon status changed to excluido!' });

    } catch (error) {
      console.log('Erro ao alterar status do salon');
      return response.status(409).json({ error: 'Erro ao alterar status do salon' });
    }
  }
}

export { AlterarStatusSalonCollaboratorController };
