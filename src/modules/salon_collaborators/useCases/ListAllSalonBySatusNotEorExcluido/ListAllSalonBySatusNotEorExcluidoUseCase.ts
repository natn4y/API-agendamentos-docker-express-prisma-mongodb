import { prisma } from '@database/prismaClient';

export class ListAllSalonBySatusNotEorExcluidoUseCase {
  async execute(salaoId: string) {
    try {
      const salon = prisma.salon_collaborators.findFirst({
        where: {
          salaoId,
          NOT: [
            {
              status: "E",
            },
            {
              status: "Excluído",
            }
          ]
        }
      })

      console.log(salon);

      return salon
    } catch (error) {
      throw new Error("Contate ao desenvolvedor");
    }
  }
}