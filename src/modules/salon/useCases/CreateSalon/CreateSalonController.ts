import { Request, Response } from 'express';

import { CreateSalonUseCase } from './CreateSalonUseCase';

class CreateSalonController {
  async handle(request: Request, response: Response) {
    const {
      nome,
      foto,
      capa,
      email,
      senha,
      telefone,
      dataCadastro,
      enderecoId,
      endereco,
    } = request.body;

    try {
      const createSalaoUseCase = new CreateSalonUseCase();
      await createSalaoUseCase.execute({
        nome,
        foto,
        capa,
        email,
        senha,
        telefone,
        dataCadastro,
        endereco,
      });
      return response.status(200).json({ message: 'Salão cadastrado com sucesso!' });
    } catch (error) {
      console.log('Erro ao cadastrar Salão');
      return response.status(409).json({ error: 'Salão already exists' });
    }
  }
}

export { CreateSalonController };