import { prisma } from '@database/prismaClient';

class AlterarStatusSalonCollaboratorUseCase {
  async execute(id: string) {
    try {
      const existingSalonCollaborator = await prisma.salon_collaborators.findUnique({
        where: {
          id: id,
        },
      });

      if (!existingSalonCollaborator) {
        throw new Error('No SalonCollaborator with this id found');
      }

      await prisma.salon_collaborators.update({
        where: {
          id: id,
        },
        data: {
          status: 'Excluido',
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao alterar status do salon');
    }
  }
}

export { AlterarStatusSalonCollaboratorUseCase };
