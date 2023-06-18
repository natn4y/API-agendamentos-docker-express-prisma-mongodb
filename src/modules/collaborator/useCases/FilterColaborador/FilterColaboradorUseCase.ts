import { prisma } from '@database/prismaClient';

export class FilterColaboradorUseCase {
  async execute(filter: Record<string, any>) {
    const collaborators = await prisma.collaborators.findMany({
      where: filter,
    });

    return collaborators;
  }
}