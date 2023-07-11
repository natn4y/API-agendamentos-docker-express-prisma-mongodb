import { hash } from 'bcrypt';

import { prisma } from '@database/prismaClient';

interface ICreateClient {
  nome: string;
  senha: string;
  dataNascimento: string;
  email: string;
  foto: string;
  telefone: string;
  documentoId?: string;
  enderecoId?: string;
  endereco: {
    pais: string
    numero: string
    cep: string
    uf: string
    cidade: string
    rua: string
  };
  documment: {
    tipo: string;
    numero: string;
  };
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
    endereco,
    documment,
  }: ICreateClient) {
    try {
      const existingClient = await prisma.clients.findFirst({
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

      const newClient = await prisma.clients.create({
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

      await prisma.addresses.create({
        data: {
          cep: endereco.cep,
          cidade: endereco.cidade,
          numero: endereco.numero,
          pais: endereco.pais,
          rua: endereco.rua,
          uf: endereco.uf,
          clientId: newClient.id,
          salonId: null,
        }
      });

      await prisma.documents.create({
        data: {
          numero: documment.tipo,
          tipo: documment.tipo,
          clientId: newClient.id,
        }
      });

      return newClient;
    } catch (error) {
      console.error('Erro ao cadastrar clients', error);
      throw error;
    }
  }
}

export { CreateClientUseCase };
