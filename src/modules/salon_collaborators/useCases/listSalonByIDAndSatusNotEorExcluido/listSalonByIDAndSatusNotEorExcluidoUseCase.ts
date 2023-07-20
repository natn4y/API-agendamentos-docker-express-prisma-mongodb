import { prisma } from '@database/prismaClient';

class ListSalonByIDAndStatusNotEorExcluidoUseCase {
  async execute(salaoId: any) {
    try {
      const salon = await prisma.salon_collaborators.findFirst({
        where: {
          salaoId: salaoId,
          status: {
            notIn: ["E", "Excluido"]
          },
        },
        select: {
          salaoId: true,
          colaboradorId: true
        }
      });

      console.log(salon);

      const collaborators = await prisma.collaborators.findMany({
        where: {
          salaoId: salon?.salaoId
        },
        select: {
          id: true,
          nome: true,
          telefone: true,
          email: true,
          senha: false,
          foto: true,
          dataNascimento: true,
          sexo: true,
          status: true,
          conta_bancaria: false,
          dataCadastro: true,
          recipientId: false,
          horarioId: true,
          colaboradorId: false,
          especialidadesIds: true,
          vinculo: false,
          vinculoId: true,
        }
      });

      const especialidadesIdList = collaborators.map((collaborator) => collaborator.especialidadesIds);

      console.log(especialidadesIdList);

      const salao = await prisma.salons.findFirst({
        where: {
          id: salon?.salaoId
        },
        select: {
          id: true,
          nome: true,
          foto: true,
          capa: true,
          email: true,
          senha: false,
          telefone: true,
          dataCadastro: true,
          enderecoId: true,
        },
      });

      // Check if salon is not null
      if (salon) {
        // Unindo todos os dados em um único objeto
        return { collaborators, salao };
      } else {
        throw new Error('Salão não encontrado.');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to list salon collaborators.');
    }
  }
}

export { ListSalonByIDAndStatusNotEorExcluidoUseCase };
