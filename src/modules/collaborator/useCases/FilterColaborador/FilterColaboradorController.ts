import { Request, Response } from 'express';
import { FilterColaboradorUseCase } from './FilterColaboradorUseCase';

export class FilterColaboradorController {
  async handle(request: Request, response: Response) {
    const {
      filter
    } = request.body;
    try {
      const filterColaboradorUseCase = new FilterColaboradorUseCase();
      const result = await filterColaboradorUseCase.execute(filter);

      response.status(200).json(result)
    } catch (error) {
      response.status(500).json(error)
    }
  }
}