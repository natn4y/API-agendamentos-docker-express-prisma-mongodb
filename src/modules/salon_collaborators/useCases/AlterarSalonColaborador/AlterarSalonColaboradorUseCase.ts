import { prisma } from '@database/prismaClient';

interface IAlterarColaborador {
  colaboradorId: string;
  vinculo: string;
  vinculoId: string;
  especialidadesId: string[];
}

export class AlterarSalonColaboradorUseCase {
  async execute({
    colaboradorId,
    vinculo,
    vinculoId,
    especialidadesId
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

    const colaboradorServicos = especialidadesId.map((especialidade) => ({
      colaboradorId,
      servicoId: especialidade,
      status: "ativo",
    }));

    await prisma.collaborator_services.createMany({
      data: colaboradorServicos,
    });
  }
}