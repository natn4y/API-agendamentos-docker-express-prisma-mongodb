import { prisma } from '@database/prismaClient';

interface ICreateHorario {
  salaoId: string;
  especialidadesIds: any;
  colaboradoresIds: any;
  dias: number[];
  inicio: string;
  fim: string;
}

export class CreateHorarioUseCase {
  async execute({
    salaoId,
    especialidadesIds,
    colaboradoresIds,
    dias,
    inicio,
    fim,
  }: ICreateHorario) {
    try {
      const res = await prisma.horario.create({
        data: {
          salaoId,
          dias,
          inicio,
          fim,
          especialidadesIds,
          colaboradoresIds,
        },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar horário");
    }
  }
}
