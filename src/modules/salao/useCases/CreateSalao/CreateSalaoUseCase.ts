import { prisma } from '../../../../database/prismaClient';

interface ICreateSalao {
  nome: string;
  foto: string;
  capa: string;
  email: string;
  senha: string;
  telefone: string;
  dataCadastro: string;
  enderecoId: string;
}

class CreateSalaoUseCase {
  async execute({
    nome,
    foto,
    capa,
    email,
    senha,
    telefone,
    dataCadastro,
    enderecoId,
  }: ICreateSalao) {
    try {
      const salaoExist = await prisma.salons.findFirst({
        where: {
          nome: {
            equals: nome,
            mode: 'insensitive',
          },
        },
      });

      if (salaoExist) {
        throw new Error("Salão already exists");
      }

      const res = await prisma.salons.create({
        data: {
          nome,
          foto,
          capa,
          email,
          senha,
          telefone,
          dataCadastro,
          enderecoId,
        },
      });

      console.log(res);

    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar Salão");
    }
  }
}

export { CreateSalaoUseCase }
