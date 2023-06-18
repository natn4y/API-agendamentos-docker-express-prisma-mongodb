import { hash } from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ICreateAddress {
  pais: string;
  numero: string;
  cep: string;
  uf: string;
  cidade: string;
  clientId?: string;
  salonId?: string;
}

class CreateAddressUseCase {
  async execute({
    pais,
    numero,
    cep,
    uf,
    cidade,
    clientId,
    salonId,
  }: ICreateAddress) {
    try {
      const existingAddress = await prisma.addresses.findFirst({
        where: {
          OR: [
            {
              clientId: {
                equals: clientId,
                mode: 'insensitive',
              },
            },
            {
              salonId: {
                equals: salonId,
                mode: 'insensitive',
              },
            },
          ],
        },
      });


      if (existingAddress) {
        throw new Error("Address already exists");
      }

      const newAddress = await prisma.addresses.create({
        data: {
          pais,
          numero,
          cep,
          uf,
          cidade,
          clientId,
          salonId,
        },
      });

      return newAddress;
    } catch (error) {
      console.error('Erro ao cadastrar endereço', error);
      throw error;
    }
  }
}

export { CreateAddressUseCase };
