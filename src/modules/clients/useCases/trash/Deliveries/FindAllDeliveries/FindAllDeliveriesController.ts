import { Request, Response } from 'express';
import { FindAllDeliveriesUseCase } from './FindAllDeliveriesUseCase';


export class FindAllDeliveriesController {
  async handle(request: Request, response: Response) {

    const { id_client } = request; // Como o clients já vai tá autenticado na aplicação, podemos pegar direto do request

    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase();
    const deliveries = await findAllDeliveriesUseCase.execute(id_client);

    return response.json(deliveries);
  }
}