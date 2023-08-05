import { prisma } from '@database/prismaClient'
import moment from 'moment'

interface IPeriodo {
  inicio: Date
  final: Date
}

interface IFilterAgendamento {
  periodo: IPeriodo
  salaoId: string
}

export class FilterAgendamentoUseCase {
  async execute({ periodo, salaoId }: IFilterAgendamento) {
    const agendamento = await prisma.agendamento.findMany({
      where: {
        status: 'Ativo',
        salaoId,
        data: {
          gte: moment(periodo.inicio)
            .startOf('day')
            .toDate()
            .toISOString(),
          lte: moment(periodo.final)
            .endOf('day')
            .toDate()
            .toISOString(),
        },
      },
      select: {
        salaoId: true,
        clientId: true,
        servicoId: true,
        colaboradorId: true,
        status: true,
        data: true,
        comissao: true,
        valor: true,
      },
    })

    return agendamento
  }
}
