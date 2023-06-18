import { prisma } from '@database/prismaClient';

interface ICreateAddress {
  colaboradorId: string;
  servicoId: string;
  status: string;
}

class CreateCollaboratorServiceUseCase {
  async execute({
    colaboradorId,
    servicoId,
    status,
  }: ICreateAddress) {
    try {
      const newColaboradorService = await prisma.collaborator_services.create({
        data: {
          colaboradorId,
          servicoId,
          status,
        },
      });

      return newColaboradorService;
    } catch (error) {
      console.error('Erro ao cadastrar conta colaborador', error);
      throw error;
    }
  }
}

export { CreateCollaboratorServiceUseCase };
