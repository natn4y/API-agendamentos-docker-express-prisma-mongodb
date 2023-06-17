import { prisma } from '../../../../database/prismaClient'

class ListAllSalaoServicesUseCase {
  async execute(salaoId: string) {

    const servicos = await prisma.servicos.findMany({
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

    return servicos;
  }
}

export { ListAllSalaoServicesUseCase }