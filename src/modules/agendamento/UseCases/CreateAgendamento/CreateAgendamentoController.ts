import { Request, Response } from 'express';
import { CreateAgendamentoUseCase } from './CreateAgendamentoUseCase';
import { prisma } from '@database/prismaClient';
import { toCent } from '../../../../util/convert';

export class CreateAgendamentoController {
  async handle(request: Request, response: Response) {
    const createAgendamentoUseCase = new CreateAgendamentoUseCase();

    const {
      clientId,
      salaoId,
      servicoId,
      colaboradorId,
      status,
      data,
      comissao,
      valor,
      transactionId
    } = request.body

    try {
      const client = await prisma.clients.findFirst({
        where: {
          id: clientId
        },
        select: {
          nome: true,
          enderecoId: true,
        }
      });

      const salon = await prisma.clients.findFirst({
        where: {
          id: salaoId
        },
        select: {
          nome: true,
          enderecoId: true,
        }
      });

      const servico = await prisma.services.findFirst({
        where: {
          id: servicoId
        },
        select: {
          preco: true,
          titulo: true,
          comissao: true,
        }
      })

      const colaborador = await prisma.collaborators.findFirst({
        where: {
          id: colaboradorId
        },
        select: {
          recipientId: true
        }
      })

      //const finalPrice = toCent(servico?.preco)
      //console.log(finalPrice);

      // IMPLEMENTAR PAGAMENTO

      await createAgendamentoUseCase.execute({
        clientId,
        salaoId,
        servicoId,
        colaboradorId,
        status,
        data,
        comissao,
        valor,
        transactionId
      })

      response.status(200).json("Agendamento criado com sucesso!")
    } catch (error) {
      if (error instanceof Error && error.message === 'Agendamento already exists') {
        return response.status(409).json({ error: 'Agendamento already exists' });
      }

      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}