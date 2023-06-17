import { Router } from 'express';
import { CreateGeolocalizationController } from '../modules/geolocalization/useCases/CreateGeolocalization/CreateGeolocalizationController';

const geolocalizationRoutes = Router();
const createGeolocalizationController = new CreateGeolocalizationController();

geolocalizationRoutes.post("/create", createGeolocalizationController.handle);

export default geolocalizationRoutes;
