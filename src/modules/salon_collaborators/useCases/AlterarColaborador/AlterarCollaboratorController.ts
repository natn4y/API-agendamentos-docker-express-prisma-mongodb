import { Request, Response } from 'express';
import { AlterarColaboradorUseCase } from './AlterarColaboradorUseCase';
import { prisma } from '../../../../database/prismaClient';

export class AlterarCollaboratorController {
  async handle(request: Request, response: Response) {
    try {
      const { colaboradorId } = request.params;

      const {
        vinculo, // Vínculo (string)
        vinculoId, // ID do vínculo (string)
        especialidadesId, // IDs das especialidades (array de strings)
      }: {
        vinculo: string;
        vinculoId: string;
        especialidadesId: string[];
      } = request.body;

      // VINCULO
      // Atualiza o status do vínculo na tabela salon_collaborators
      await prisma.salon_collaborators.update({
        where: {
          id: vinculoId, // Condição de pesquisa: ID do vínculo
        },
        data: {
          status: vinculo, // Novo valor do status
        }
      });

      // ESPECIALIDADES
      // Deleta todos os registros de colaborador_servico relacionados ao colaborador
      await prisma.collaborator_services.deleteMany({
        where: {
          colaboradorId // Condição de pesquisa: ID do colaborador
        }
      });

      // para cada especialidadeId passada na requisição...
      const colaboradorServicos = especialidadesId.map((especialidade) => ({
        colaboradorId, // ID do colaborador
        servicoId: especialidade, // ID da especialidade
        status: "ativo", // Status da especialidade (ativo)
      }));

      console.log(colaboradorServicos); // Exibe os colaboradorServicos no console para fins de depuração

      // Cria múltiplos registros de colaborador_servico na tabela collaborator_services
      await prisma.collaborator_services.createMany({
        data: colaboradorServicos, // Dados dos colaboradorServicos a serem criados
      });

      // const alterarColaboradorUseCase = new AlterarColaboradorUseCase();

      // await alterarColaboradorUseCase.execute(colaboradorId);

      response.status(200).send("Collaborators editado com sucesso!"); // Retorna uma resposta de sucesso
    } catch (error) {
      response.status(500).send(error); // Retorna uma resposta de erro em caso de exceção
    }
  }
}
