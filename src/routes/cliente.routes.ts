import { Router } from 'express'

import { CreateClientController } from '@modules/clients/useCases/CreateClient/CreateClientController'
import { AuthenticateClientController } from '@modules/accounts/authenticateClient/AuthenticateClientController'

const ClientRoutes = Router()
const createClientController = new CreateClientController()
const authenticateClientController =
  new AuthenticateClientController()

ClientRoutes.post('/create', createClientController.handle)
ClientRoutes.post(
  '/authenticate',
  authenticateClientController.handle,
)

export default ClientRoutes
