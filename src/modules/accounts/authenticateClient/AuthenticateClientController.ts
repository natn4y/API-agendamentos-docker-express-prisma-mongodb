import { Request, Response } from 'express'
import { AuthenticateClientUseCase } from './AuthenticateClientUseCase'

class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    try {
      const authenticateClientUseCase =
        new AuthenticateClientUseCase()

      const { nome, senha } = request.body

      const result =
        await authenticateClientUseCase.execute({
          nome,
          senha,
        })

      console.log('Clients autenticado com sucesso!')
      return response.status(200).json(result)
    } catch (error) {
      console.log(error)
      return response
        .status(500)
        .json({ error: 'Failed to authenticate client' })
    }
  }
}

export { AuthenticateClientController }
