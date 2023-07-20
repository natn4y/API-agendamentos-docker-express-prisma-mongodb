import { Request, Response } from 'express';
import { AlterarSalonColaboradorUseCase } from './AlterarSalonColaboradorUseCase';

export class AlterarCollaboratorController {
  async handle(request: Request, response: Response) {
    try {
      const { colaboradorId } = request.params;

      const {
        vinculo,
        vinculoId,
        especialidadesIds,
      }: {
        vinculo: string;
        vinculoId: string;
        especialidadesIds: string[];
      } = request.body;

      const alterarSalonColaboradorUseCase = new AlterarSalonColaboradorUseCase();

      await alterarSalonColaboradorUseCase.execute({
        colaboradorId,
        vinculo,
        vinculoId,
        especialidadesIds,
      });

      return response.status(200).json({ message: 'success!' });
    } catch (error) {
      console.log(error);
      return response.status(200).json({ message: error });
    }
  }
}
