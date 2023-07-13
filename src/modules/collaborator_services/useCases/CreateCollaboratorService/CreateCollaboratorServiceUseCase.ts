import { prisma } from '@database/prismaClient';

interface ICreateAddress {
  colaboradorId: string;
  servicoId: string;
  status: string;
  salaoId?: any;
}

class CreateCollaboratorServiceUseCase {
  async execute({
    colaboradorId,
    servicoId,
    status,
    salaoId,
  }: ICreateAddress) {
    try {
      const newColaboradorService = await prisma.collaborator_services.create({
        data: {
          colaboradorId,
          servicoId,
          status,
          salaoId,
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
