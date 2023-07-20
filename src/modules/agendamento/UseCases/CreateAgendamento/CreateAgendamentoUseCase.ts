import { prisma } from '@database/prismaClient';
import { float } from 'aws-sdk/clients/cloudfront';

interface ICreateAgendamento {
  clientId: string;
  salaoId: string;
  servicoId: string;
  colaboradorId: string;
  status: string;
  data: string;
  comissao: float;
  valor: float;
  transactionId: string;
}

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
  }: ICreateAgendamento) {
    try {
      const newAgendamento = await prisma.agendamento.create({
        data: {
          clientId,
          salaoId,
          servicoId,
          colaboradorId,
          status,
          data,
          comissao,
          valor,
          transactionId,
        }
      })

      return newAgendamento;
    } catch (error) {
      console.log(error);
    }
  }
}