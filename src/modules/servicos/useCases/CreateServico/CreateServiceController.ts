import { Request, Response } from 'express';
import { CreateServiceUseCase } from './CreateServiceUseCase';

class CreateServiceController {
  async handle(request: Request, response: Response) {
    const {
      salaoId,
      titulo,
      preco,
      comissao,
      recorrencia,
      duracao,
      descricao,
      status,
      dataCadastro,
    } = request.body;

    try {
      const createServiceUseCase = new CreateServiceUseCase();
      await createServiceUseCase.execute({
        salaoId,
        titulo,
        preco,
        comissao,
        recorrencia,
        duracao,
        descricao,
        status,
        dataCadastro,
      });
      return response.status(200).json({ message: 'Serviço cadastrado com sucesso!' });
    } catch (error) {
      console.log('Erro ao cadastrar Serviço:', error);
      return response.status(409).json({ error: 'Serviço already exists' });
    }
  }
}

export { CreateServiceController };
