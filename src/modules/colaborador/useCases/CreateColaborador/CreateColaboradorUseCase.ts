import { prisma } from '../../../../database/prismaClient';

interface ICreateSalao {
  colaborador: {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    foto: string;
    dataNascimento: string;
    sexo: string;
    status: string;
    ContaBancariaId: string;
    dataCadastro: Date;
    recipientId: string;
    horarioId: string;
    especialidadesId: string[];
    vinculo: string;
  };
  salaoId: any;
}

class CreateColaboradorUseCase {
  async execute({
    colaborador,
    salaoId,
  }: ICreateSalao) {
    try {
      const colaboradorExist = await prisma.colaborador.findFirst({
        where: {
          OR: [
            {
              email: {
                equals: colaborador.email,
                mode: 'insensitive',
              },
            },
            {
              recipientId: {
                equals: colaborador.recipientId,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      if (colaboradorExist) {
        throw new Error("Colaborador já existe");
      }

      // CRIAR CONTA BANCÁRIA

      // CRIAR RECEBEDOR

      const result = await prisma.colaborador.create({
        data: colaborador,
      });

      const existentRelationShip = await prisma.salaoColaborador.findFirst({
        where: {
          colaboradorId: salaoId
        }
      });

      console.log(existentRelationShip);

      const colaboradorId = existentRelationShip ? existentRelationShip.id : "";

      console.log(result);

    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar Colaborador");
    }
  }
}

export { CreateColaboradorUseCase }
