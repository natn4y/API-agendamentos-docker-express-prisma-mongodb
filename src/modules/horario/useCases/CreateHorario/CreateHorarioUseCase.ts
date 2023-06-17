import { prisma } from '../../../../database/prismaClient';

interface ICreateHorario {
  salaoId: string;
  especialidades: any;
  colaboradores: any;
  dias: number[];
  inicio: string;
  fim: string;
}

export class CreateHorarioUseCase {
  async execute({
    salaoId,
    especialidades,
    colaboradores,
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
          especialidadesId: especialidades,
          colaboradoresId: colaboradores,
        },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar horário");
    }
  }
}
