import { Request, Response } from 'express';
import { CreateAddressUseCase } from './CreateAddressUseCase';

class CreateAddressController {
  async handle(request: Request, response: Response) {
    const createAddressUseCase = new CreateAddressUseCase();

    const {
      pais,
      numero,
      cep,
      uf,
      cidade,
      clientId,
      salonId,
    } = request.body;

    try {
      await createAddressUseCase.execute({
        pais,
        numero,
        cep,
        uf,
        cidade,
        clientId,
        salonId,
      });

      return response.status(200).json({ message: 'Address cadastrado com sucesso!' });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Address already exists') {
        return response.status(409).json({ error: 'Address already exists' });
      }

      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreateAddressController };
