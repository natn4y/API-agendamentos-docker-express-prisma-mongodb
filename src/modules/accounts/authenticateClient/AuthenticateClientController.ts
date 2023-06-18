import { Request, Response } from 'express';
import { AuthenticateClientUseCase } from './AuthenticateClientUseCase';

class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    try {
      const authenticateClientUseCase = new AuthenticateClientUseCase();

      const { username, password } = request.body;

      const result = await authenticateClientUseCase.execute({ username, password });

      console.log('Clients autenticado com sucesso!');
      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'Failed to authenticate client' });
    }
  }
}

export { AuthenticateClientController };
