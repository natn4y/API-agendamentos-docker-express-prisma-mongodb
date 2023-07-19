import { Request, Response } from 'express';
import { AlterarStatusSalonCollaboratorUseCase } from './AlterarStatusSalonCollaboratorUseCase';

class AlterarStatusSalonCollaboratorController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const alterarStatusSalonCollaboratorUseCase = new AlterarStatusSalonCollaboratorUseCase();

      await alterarStatusSalonCollaboratorUseCase.execute(id);

      return response.status(200).json({ message: 'Salon status changed to Excluido!' });
    } catch (error:any) {
      console.log('Erro ao alterar status do salon', error);

      if (error.message === 'No SalonCollaborator with this id found') {
        return response.status(404).json({ error: 'No SalonCollaborator with this id found' });
      } else {
        return response.status(500).json({ error: 'Erro ao alterar status do salon' });
      }
    }
  }
}

export { AlterarStatusSalonCollaboratorController };
