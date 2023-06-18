import { prisma } from '@database/prismaClient';

class ListAllSalonServiceUseCase {
  async execute(salaoId: string) {

    const services = await prisma.services.findMany({
      where: {
        status: {
          equals: 'A',
          mode: 'insensitive',
        },
        salaoId: {
          equals: salaoId,
        }
      },
    })

    return services;
  }
}

export { ListAllSalonServiceUseCase }