import { Request, Response } from 'express';
import { CreateContaBancariaUseCase } from './CreateContaBancariaUseCase';

class CreateContaBancariaController {
  async handle(request: Request, response: Response) {
    const createContaBancariaUseCase = new CreateContaBancariaUseCase();

    const {
      titular,
      cpfcnpj,
      banco,
      tipo,
      agencia,
      numero,
      dv,
    } = request.body;

    try {
      await createContaBancariaUseCase.execute({
        titular,
        cpfcnpj,
        banco,
        tipo,
        agencia,
        numero,
        dv,
      });

      return response.status(200).json({ message: 'Conta cadastrada com sucesso!' });
    } catch (error: unknown) {
      return response.status(409).json({ error: 'Conta already exists' });
    }
  }
}

export { CreateContaBancariaController };
