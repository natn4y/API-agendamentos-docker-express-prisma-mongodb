import { Router } from 'express';
import { CreateDocumentController } from '../modules/documents/useCases/CreateDocument/CreateDocumentController';

const DocumentsRoute = Router();
const createDocumentController = new CreateDocumentController();

DocumentsRoute.post("/create", createDocumentController.handle);

export default DocumentsRoute;
