import { Request, Response } from 'express';
import { AlterarSalonColaboradorUseCase } from './AlterarSalonColaboradorUseCase';

export class AlterarCollaboratorController {
  async handle(request: Request, response: Response) {
    try {
      const { colaboradorId } = request.params;

      const {
        vinculo,
        vinculoId,
        especialidadesId,
      }: {
        vinculo: string;
        vinculoId: string;
        especialidadesId: string[];
      } = request.body;

      const alterarSalonColaboradorUseCase = new AlterarSalonColaboradorUseCase();

      await alterarSalonColaboradorUseCase.execute({
        colaboradorId,
        vinculo,
        vinculoId,
        especialidadesId,
      });

      return response.status(200).json({ message: 'success!' });
    } catch (error) {
      console.log(error);
      return response.status(200).json({ message: error });
    }
  }
}
