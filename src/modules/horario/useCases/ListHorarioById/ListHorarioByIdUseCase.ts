import { prisma } from '@database/prismaClient';

export class ListHorarioByIdUseCase {
  async execute(horarioId: string) {
    try {
      const horario = await prisma.horario.findFirst({
        where: {
          id: horarioId,
        }
      });

      return horario;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to list Horario by ID.");
    }
  }
}
