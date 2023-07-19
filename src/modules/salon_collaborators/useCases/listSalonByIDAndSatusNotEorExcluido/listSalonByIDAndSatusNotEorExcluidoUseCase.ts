import { prisma } from '@database/prismaClient';

class ListSalonByIDAndStatusNotEorExcluidoUseCase {
  async execute(salaoId: any) {
    const listColaboradores = []; // Complete com a lógica para preencher a lista de colaboradores
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

      const collaborators = await prisma.collaborators.findMany({
        where: {
          id: salon?.colaboradorId
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
          recipientId: true,
          horarioId: true,
          colaboradorId: false,
          especialidadesId: true,
          vinculo: false,
          vinculoId: true,
        }
      });

      const especialidadesIdList = collaborators.map((collaborator) => collaborator.especialidadesId);

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
          senha: true,
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
