import { prisma } from '../../../../database/prismaClient';

interface ICreateSalaoColaborador {
  salaoId: string;
  colaboradorId: string;
  status: string;
}

class CreateSalaoColaboradorUseCase {
  async execute({
    salaoId,
    colaboradorId,
    status,
  }: ICreateSalaoColaborador) {
    try {
      const salaoColaboradorExist = await prisma.salon_collaborators.findFirst({
        where: {
          OR: [
            {
              colaboradorId: {
                equals: colaboradorId,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      if (salaoColaboradorExist) {
        throw new Error("Salão Collaborators já existe");
      }


      const result = await prisma.salon_collaborators.create({
        data: {
          salaoId,
          colaboradorId,
          status,
        },
      });

      console.log(result);

    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar Collaborators");
    }
  }
}

export { CreateSalaoColaboradorUseCase }
