import { prisma } from '@database/prismaClient'

export class FilterColaboradorUseCase {
  async execute(filter: Record<string, any>) {
    const collaborators =
      await prisma.collaborators.findMany({
        where: filter,
        select: {
          nome: true,
          id: true,
          especialidadesIds: true,
          foto: true,
          salaoId: true,
        },
      })

    return collaborators
  }
}
