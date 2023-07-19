import { prisma } from '@database/prismaClient';

class AlterarStatusSalonCollaboratorUseCase {
  async execute(id: string) {
    try {
      await prisma.salon_collaborators.update({
        where: {
          id: id
        },
        data: {
          status: "Excluido",
        }
      });

    } catch (error) {
      console.log(error);
      throw new Error("Salon status to Excluido");
    }
  }
}

export { AlterarStatusSalonCollaboratorUseCase }
