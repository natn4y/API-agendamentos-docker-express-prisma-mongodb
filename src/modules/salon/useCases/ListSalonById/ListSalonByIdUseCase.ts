import { prisma } from '@database/prismaClient';
import { distance, Coord } from '@turf/turf';

class ListSalonByIdUseCase {
  async execute(salaoId: string) {
    const salons = await prisma.salons.findFirst({
      where: {
        id: salaoId,
      },
      select: {
        id: true,
        nome: true,
        capa: true,
        geo: {
          select: {
            coordinates: true,
          }
        },
      },
    });

    const targetPoint: Coord = {
      type: 'Point',
      coordinates: [-10.043858, -51.103487],
    };

    let response;

    if (salons && salons.geo && salons.geo.coordinates) {
      const salaoPoint: Coord = {
        type: 'Point',
        coordinates: salons.geo.coordinates,
      };

      const calculatedDistance = distance(salaoPoint, targetPoint);
      const { id, nome, capa, geo } = salons;

      response = {
        id,
        nome,
        capa,
        geo,
        distance: calculatedDistance,
      };
    } else {
      // Lógica para lidar com o caso em que salons.geo.coordinates é nulo
      const { id, nome, capa } = salons!;

      response = {
        id,
        nome,
        capa,
        geo: null,
        distance: null,
      };
    }

    return response;
  }
}

export { ListSalonByIdUseCase };
