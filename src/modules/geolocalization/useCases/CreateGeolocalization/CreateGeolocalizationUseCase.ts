import { prisma } from '../../../../database/prismaClient';

interface ICreateSalao {
  tipo: string;
  coordinates: [];
  salaoId: string;
}

class CreateGeolocalizationUseCase {
  async execute({
    tipo,
    coordinates,
    salaoId,
  }: ICreateSalao) {
    try {
      const geolocalizationExist = await prisma.geolocalization.findFirst({
        where: {
          salaoId: {
            equals: salaoId,
            mode: 'insensitive',
          },
        },
      });

      if (geolocalizationExist) {
        throw new Error("Geolocalization already exists");
      }

      const res = await prisma.geolocalization.create({
        data: {
          tipo,
          coordinates,
          salaoId,
        },
      });

      console.log(res);

    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar Geolocalization");
    }
  }
}

export { CreateGeolocalizationUseCase }
