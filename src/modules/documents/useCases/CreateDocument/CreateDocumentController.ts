import { Request, Response } from 'express';
import { CreateDocumentUseCase } from './CreateDocumentUseCase';

class CreateDocumentController {
  async handle(request: Request, response: Response) {
    const createDocumentUseCase = new CreateDocumentUseCase();

    const {
      tipo,
      numero,
      clientId,
    } = request.body;

    try {
      await createDocumentUseCase.execute({
        tipo,
        numero,
        clientId,
      });

      return response.status(200).json({ message: 'Documento cadastrado com sucesso!' });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Documento already exists') {
        return response.status(409).json({ error: 'Documento already exists' });
      }

      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreateDocumentController };
