import { prisma } from '@database/prismaClient'

export class ListAgendamentosUseCase {
  async execute() {
    const agendamentos = await prisma.agendamento.findMany()

    return agendamentos
  }
}
