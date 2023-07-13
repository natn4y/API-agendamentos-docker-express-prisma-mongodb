import { prisma } from '@database/prismaClient';

class ListAllSalonColaboratorUseCase {
  async execute() {
    try {
      const salon_collaborators = await prisma.salon_collaborators.findMany();

      return salon_collaborators;
    } catch (error) {

      console.error(error);
      throw new Error('Failed to list salon collaborators.');
    }
  }
}

export { ListAllSalonColaboratorUseCase };