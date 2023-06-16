import { prisma } from '../../../../database/prismaClient';

interface ICreateService {
  salaoId: string;
  titulo: string;
  preco: number;
  comissao: number;
  recorrencia: number;
  duracao: number;
  descricao: string;
  status: string;
  dataCadastro: Date;
}

class CreateServiceUseCase {
  async execute({
    salaoId,
    titulo,
    preco,
    comissao,
    recorrencia,
    duracao,
    descricao,
    status,
    dataCadastro,
  }: ICreateService) {
    try {
      const servicoExist = await prisma.servico.findFirst({
        where: {
          titulo: {
            equals: titulo,
            mode: 'insensitive',
          },
        },
      });

      console.log('Serviço existente:', servicoExist);

      if (servicoExist) {
        throw new Error("Service already exists");
      }

      const res = await prisma.servico.create({
        data: {
          salaoId,
          titulo,
          preco,
          comissao,
          recorrencia,
          duracao,
          descricao,
          status,
          dataCadastro,
        },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
      throw error; // Lança novamente a exceção para ser tratada no controlador
    }
  }
}

export { CreateServiceUseCase };
