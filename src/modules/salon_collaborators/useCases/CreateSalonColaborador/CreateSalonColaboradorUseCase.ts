import { prisma } from '@database/prismaClient';

interface ICreateSalaoColaborador {
  colaboradorId: string;
  status: any;
  salaoId?: any;
}

export class CreateSalonColaboradorUseCase {
  async execute({
    salaoId,
    colaboradorId,
    status,
  }: ICreateSalaoColaborador) {
    try {
      await prisma.salon_collaborators.create({
        data: {
          salaoId,
          colaboradorId,
          status,
        }
      })
    // await prisma.salon_collaborators.findFirst({
    //  where: {
    //   colaboradorId,
    //   status: 'AA'
    //  }
    // })
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar Collaborators");
    }
  }
}
