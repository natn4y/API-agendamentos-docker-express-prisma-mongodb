import { prisma } from '@database/prismaClient';

interface ICreateAddress {
  titular: string;
  cpfcnpj: string;
  banco: string;
  tipo: string;
  agencia: string;
  numero: string;
  dv: string;
}

class CreateContaBancariaUseCase {
  async execute({
    titular,
    cpfcnpj,
    banco,
    tipo,
    agencia,
    numero,
    dv,
  }: ICreateAddress) {
    try {
      const existingConta = await prisma.conta_bancaria.findFirst({
        where: {
          titular: {
            equals: titular,
            mode: 'insensitive',
          },
        },
      });


      if (existingConta) {
        throw new Error("Conta bancária already exists");
      }

      const newConta = await prisma.conta_bancaria.create({
        data: {
          titular,
          cpfcnpj,
          banco,
          tipo,
          agencia,
          numero,
          dv,
        },
      });

      return newConta;
    } catch (error) {
      console.error('Erro ao cadastrar conta bancária', error);
      throw error;
    }
  }
}

export { CreateContaBancariaUseCase };
