import { prisma } from '@database/prismaClient';

export class DeleteHorarioByIdUseCase {
  async execute(horarioId: string) {
    console.log(horarioId);
    try {
      await prisma.horario.delete({
        where: {
          id: horarioId
        }
      });
      console.log('Horario deleted successfully');
    } catch (error) {
      console.log(error);
    }
  }
}
