import { Request, Response } from 'express';
import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
  async handle(request: Request, response: Response) {
    const createClientUseCase = new CreateClientUseCase();

    const {
      nome,
      senha,
      dataNascimento,
      email,
      foto,
      telefone,
      endereco,
      documment,
      status,
      sexo,
    } = request.body;

    try {
      await createClientUseCase.execute({
        nome,
        senha,
        dataNascimento,
        email,
        foto,
        telefone,
        endereco,
        documment,
        status,
        sexo,
      });

      return response.status(200).json({ message: 'Cliente cadastrado com sucesso!' });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Client already exists') {
        return response.status(409).json({ error: 'Client already exists' });
      }

      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreateClientController };
