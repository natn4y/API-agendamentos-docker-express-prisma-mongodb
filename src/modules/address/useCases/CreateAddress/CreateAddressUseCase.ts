import { prisma } from '@database/prismaClient';

interface ICreateAddress {
  pais: string;
  numero: string;
  cep: string;
  uf: string;
  cidade: string;
  rua: string;
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
    rua,
    clientId,
    salonId,
  }: ICreateAddress) {
    try {
      const existingAddress = await prisma.addresses.findFirst({
        where: {
          OR: [
            {
              cep: {
                equals: cep,
                mode: 'insensitive',
              },
            }
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
          rua,
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
