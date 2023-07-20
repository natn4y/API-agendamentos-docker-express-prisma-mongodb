import { prisma } from '@database/prismaClient';

interface IAlterarColaborador {
  colaboradorId: string;
  vinculo: string;
  vinculoId: string;
  especialidadesIds: string[];
}

export class AlterarSalonColaboradorUseCase {
  async execute({
    colaboradorId,
    vinculo,
    vinculoId,
    especialidadesIds
  }: IAlterarColaborador) {
    await prisma.salon_collaborators.update({
      where: {
        id: vinculoId,
      },
      data: {
        status: vinculo,
      }
    });

    await prisma.collaborator_services.deleteMany({
      where: {
        colaboradorId
      }
    });

    const colaboradorServicos = especialidadesIds.map((especialidade) => ({
      colaboradorId,
      servicoId: especialidade,
      status: "ativo",
    }));

    await prisma.collaborator_services.createMany({
      data: colaboradorServicos,
    });
  }
}