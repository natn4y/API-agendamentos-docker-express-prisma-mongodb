import { prisma } from '@database/prismaClient';

interface ICreateSalao {
  colaborador: {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    foto: string;
    dataNascimento: string;
    sexo: string;
    status: string;
    ContaBancariaId: string;
    dataCadastro: Date;
    recipientId: string;
    horarioId: string;
    vinculo: string;
    vinculoId: string;
    especialidadesIds: string[];
  };
  conta_bancaria: {
    titular: string;
    cpfcnpj: string;
    banco: string;
    tipo: string;
    agencia: string;
    numero: string;
    dv: string;
  }
  salaoId: any;
}

class CreateCollaboratorUseCase {
  async execute({
    conta_bancaria,
    colaborador,
    salaoId,
  }: ICreateSalao) {
    try {
      let newColaborador = null;

      const colaboradorExist = await prisma.collaborators.findFirst({
        where: {
          OR: [
            {
              email: {
                equals: colaborador.email,
                mode: 'insensitive',
              },
            },
            {
              recipientId: {
                equals: colaborador.telefone,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      if (colaboradorExist) {
        throw new Error("Collaborators já existe");
      }

      // CRIAR RECEBEDOR

      const result = await prisma.collaborators.create({
        data: {
          ...colaborador,
          contaBancariaId: '', // Para limpar o valor existente, se houver
          salaoId: salaoId,
        },
      });

      // Pega o id do colaborador que foi criado
      const { id: collaboratorId } = result;

      // CRIAR CONTA BANCÁRIA
      const bank = await prisma.conta_bancaria.create({
        data: {
          agencia: conta_bancaria.agencia,
          banco: conta_bancaria.banco,
          cpfcnpj: conta_bancaria.banco,
          numero: conta_bancaria.numero,
          tipo: conta_bancaria.tipo,
          titular: conta_bancaria.titular,
          dv: conta_bancaria.dv,
          collaboratorId: collaboratorId,
        },
      });

      // Atualizar o valor de colaborador.contaBancariaId para bank.id
      await prisma.collaborators.update({
        where: {
          id: collaboratorId,
        },
        data: {
          contaBancariaId: bank.id,
        },
      });

      //! Implementar pagar.me usando os dados de bank
      //! Criar recebedor do pagar.me
      //! Criar colaborador adicionando uma prop recipientId: pagarmeRecipient.id


      // Verifica se já existe o relacionamento com o salão
      const existentRelationShip = await prisma.salon_collaborators.findFirst({
        where: {
          salaoId: salaoId,
          colaboradorId: collaboratorId,
          status: "E",
        }
      });

      // Se não existir relacionamento, cria com o salaoId que é passado
      if(!existentRelationShip) {
        await prisma.salon_collaborators.create({
          data: {
            salaoId: salaoId,
            colaboradorId: collaboratorId,
            status: colaborador.vinculo,
          }
        })
      }

      //console.log(existentRelationShip);

      //!if (existentCollaborator) - #03 - Finalizando Back-end com NodeJS e
      //!MongoDB - SE JÁ EXISTIR UM VINCULO ENTRE COLABORADOR E SALÃO: 42:48

      // pegar todas as especialidades


      await prisma.collaborator_services.createMany({
        data: colaborador.especialidadesIds.map(servicoId => ({
          salaoId,
          servicoId,
          colaboradorId: collaboratorId,
          status: "active"
        }))
      });

      if (colaboradorExist && existentRelationShip) {
        throw new Error("Colaborador já cadastrado");
      }

      // const colaboradorServices = await prisma.collaborator_services.findMany({
      //   where: {
      //     salaoId: salaoId,
      //   },
      // });

      // console.log(colaboradorServices);

      // await prisma.collaborator_services.createMany({

      // })

      // console.log(existentRelationShip);

      // const colaboradorId = existentRelationShip ? existentRelationShip.id : "";

      // console.log(result);

    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar Collaborators");
    }
  }
}

export { CreateCollaboratorUseCase }
