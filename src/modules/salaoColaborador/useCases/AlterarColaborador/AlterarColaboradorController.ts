import { Request, Response } from 'express';
import { AlterarColaboradorUseCase } from './AlterarColaboradorUseCase';
import { prisma } from '../../../../database/prismaClient';

export class AlterarColaboradorController {
  async handle(request: Request, response: Response) {
    try {
      const { colaboradorId } = request.params;

      const {
        vinculo,
        vinculoId,
        especialidadesId,
      }: {
        vinculo: string;
        vinculoId: string;
        especialidadesId: string[];
      } = request.body;

      // VINCULO
      await prisma.salao_colaboradores.update({
        where: {
          id: vinculoId,
        },
        data: {
          status: vinculo,
        }
      });

      // ESPECIALIDADES
      await prisma.colaboradores_servicos.deleteMany({
        where: {
          colaboradorId
        }
      });

      const colaboradorServicos = especialidadesId.map((especialidade) => ({
        colaboradorId,
        servicoId: especialidade,
        status: "ativo",
      }));

      console.log(colaboradorServicos);

      await prisma.colaboradores_servicos.createMany({
        data: colaboradorServicos,
      });

      const alterarColaboradorUseCase = new AlterarColaboradorUseCase();

      await alterarColaboradorUseCase.execute(colaboradorId);

      response.status(200).send("Colaborador editado com sucesso!");
    } catch (error) {
      response.status(500).send(error);
    }
  }

}