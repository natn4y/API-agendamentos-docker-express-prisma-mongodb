import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ICreateClient {
  nome: string;
  senha: string;
  dataNascimento: string;
  email: string;
  foto: string;
  telefone: string;
  documentoId: string;
  enderecoId: string;
}

class CreateClientUseCase {
  async execute({
    nome,
    senha,
    dataNascimento,
    email,
    foto,
    telefone,
    enderecoId,
    documentoId,
  }: ICreateClient) {
    try {
      const existingClient = await prisma.clientes.findFirst({
        where: {
          nome: {
            equals: nome,
            mode: 'insensitive',
          },
        },
      });

      if (existingClient) {
        throw new Error("Client already exists");
      }

      const hashPassword = await hash(senha, 10);

      const newClient = await prisma.clientes.create({
        data: {
          nome,
          senha: hashPassword,
          dataNascimento,
          email,
          foto,
          telefone,
          documentoId,
          enderecoId,
        },
      });

      return newClient;
    } catch (error) {
      console.error('Erro ao cadastrar clientes', error);
      throw error;
    }
  }
}

export { CreateClientUseCase };
