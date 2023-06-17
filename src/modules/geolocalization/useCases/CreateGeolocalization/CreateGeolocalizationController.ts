import { Request, Response } from 'express';
import { CreateGeolocalizationUseCase } from './CreateGeolocalizationUseCase';

class CreateGeolocalizationController {
  async handle(request: Request, response: Response) {
    const {
      tipo,
      coordinates,
      salaoId,
    } = request.body;

    try {
      const createGeolocalizationUseCase = new CreateGeolocalizationUseCase();
      await createGeolocalizationUseCase.execute({
        tipo,
        coordinates,
        salaoId,
      });
      return response.status(200).json({ message: 'Geolocalization cadastrada com sucesso!' });
    } catch (error) {
      console.log('Erro ao cadastrar Geolocalization');
      return response.status(409).json({ error: 'Geolocalization already exists' });
    }
  }
}

export { CreateGeolocalizationController };