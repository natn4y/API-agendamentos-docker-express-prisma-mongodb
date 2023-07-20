import { prisma } from '@database/prismaClient';

interface ICreateSalao {
  nome: string;
  foto: string;
  capa: string;
  email: string;
  senha: string;
  telefone: string;
  dataCadastro: string;
  endereco: {
    pais: string;
    numero: string;
    cep: string;
    uf: string;
    cidade: string;
    rua: string;
  };
  recipientId: string;
}

class CreateSalonUseCase {
  async execute({
    nome,
    foto,
    capa,
    email,
    senha,
    telefone,
    dataCadastro,
    endereco,
    recipientId,
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
        throw new Error('Salão already exists');
      }

      const createdSalon = await prisma.salons.create({
        data: {
          nome,
          foto,
          capa,
          email,
          senha,
          telefone,
          dataCadastro,
          recipientId,
        },
      });

      const createdEndereco = await prisma.addresses.create({
        data: {
          cep: endereco.cep,
          cidade: endereco.cidade,
          numero: endereco.numero,
          pais: endereco.pais,
          rua: endereco.rua,
          uf: endereco.uf,
          salonId: createdSalon.id,
        },
      });

      const updatedSalon = await prisma.salons.update({
        where: {
          id: createdSalon.id,
        },
        data: {
          enderecoId: createdEndereco.id,
        },
      });

      //console.log(updatedSalon);

      //console.log(createdEndereco);
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao cadastrar Salão');
    }
  }
}

export { CreateSalonUseCase };
