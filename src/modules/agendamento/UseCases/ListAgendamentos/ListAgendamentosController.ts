import { Request, Response } from 'express'
import { ListAgendamentosUseCase } from './ListAgendamentosUseCase'

export class ListAgendamentosController {
  async handle(request: Request, response: Response) {
    try {
      const listAgendamentosUseCase =
        new ListAgendamentosUseCase()

      const agendamentos =
        await listAgendamentosUseCase.execute()

      response.status(200).json(agendamentos)
    } catch (error) {
      console.log(error)
      response
        .status(500)
        .json({ error: 'An error occurred' })
    }
  }
}
