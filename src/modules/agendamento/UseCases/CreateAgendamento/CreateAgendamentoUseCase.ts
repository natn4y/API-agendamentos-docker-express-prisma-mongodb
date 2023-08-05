import { prisma } from '@database/prismaClient'

export class CreateAgendamentoUseCase {
  async execute({
    clientId,
    salaoId,
    servicoId,
    colaboradorId,
    status,
    data,
    comissao,
    valor,
    transactionId,
  }: any) {
    const agendamentoData = {
      clientId,
      salaoId,
      servicoId,
      colaboradorId,
      status,
      data,
      comissao: comissao || 20, // Utiliza o valor fornecido ou define como 20 caso não seja informado
      valor: valor || 50, // Utiliza o valor fornecido ou define como 50 caso não seja informado
      transactionId,
    }

    await prisma.agendamento.create({
      data: agendamentoData,
    })
  }
}
