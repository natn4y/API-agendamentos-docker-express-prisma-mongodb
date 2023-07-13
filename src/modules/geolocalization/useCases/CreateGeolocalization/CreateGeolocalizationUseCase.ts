import { prisma } from '@database/prismaClient';

interface ICreateSalao {
  tipo: string;
  coordinates: [];
  salaoId?: any;
}

class CreateGeolocalizationUseCase {
  async execute({
    tipo,
    coordinates,
    salaoId,
  }: ICreateSalao) {
    try {
      const geolocalizationExist = await prisma.geolocalizations.findFirst({
        where: {
          salaoId: {
            equals: salaoId,
            mode: 'insensitive',
          },
        },
      });

      if (geolocalizationExist) {
        throw new Error("Geolocalizations already exists");
      }

      const res = await prisma.geolocalizations.create({
        data: {
          tipo,
          coordinates,
          salaoId,
        },
      });

      console.log(res);

    } catch (error) {
      console.log(error);
      throw new Error("Erro ao cadastrar Geolocalizations");
    }
  }
}

export { CreateGeolocalizationUseCase }
