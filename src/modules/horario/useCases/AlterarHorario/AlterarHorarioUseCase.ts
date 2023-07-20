import { prisma } from '@database/prismaClient';

interface IAlterarHorario {
  horarioId: string;
  horario: {
    salaoId: string;
    especialidadesIds: string[];
    colaboradoresIds: string[];
    dias: number[];
    inicio: string;
    fim: string;
  };
}

export class AlterarHorarioUseCase {
  async execute({ horarioId, horario }: IAlterarHorario) {
    try {
      await prisma.horario.update({
        where: {
          id: horarioId,
        },
        data: {
          salaoId: horario.salaoId,
          especialidadesIds: horario.especialidadesIds,
          colaboradoresIds: horario.colaboradoresIds,
          dias: horario.dias,
          inicio: horario.inicio,
          fim: horario.fim,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
