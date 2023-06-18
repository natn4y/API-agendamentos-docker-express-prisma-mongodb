import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ICreateClient {
  tipo: string;
  numero: string;
  clientId: string;
}

class CreateDocumentUseCase {
  async execute({
    tipo,
    numero,
    clientId,
  }: ICreateClient) {
    try {
      const existingDocument = await prisma.documents.findFirst({
        where: {
          numero: {
            equals: numero,
            mode: 'insensitive',
          },
        },
      });

      if (existingDocument) {
        throw new Error("Document already exists");
      }

      const newDocument = await prisma.documents.create({
        data: {
          tipo,
          numero,
          clientId,
        },
      });

      return newDocument;
    } catch (error) {
      console.error('Erro ao cadastrar clients', error);
      throw error;
    }
  }
}

export { CreateDocumentUseCase };
