import { Request, Response } from 'express';
import { CreateSalaoUseCase } from './CreateSalaoUseCase';

class CreateSalaoController {
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
    } = request.body;

    try {
      const createSalaoUseCase = new CreateSalaoUseCase();
      await createSalaoUseCase.execute({
        nome,
        foto,
        capa,
        email,
        senha,
        telefone,
        dataCadastro,
        enderecoId,
      });
      return response.status(200).json({ message: 'Salão cadastrado com sucesso!' });
    } catch (error) {
      console.log('Erro ao cadastrar Salão');
      return response.status(409).json({ error: 'Salão already exists' });
    }
  }
}

export { CreateSalaoController };