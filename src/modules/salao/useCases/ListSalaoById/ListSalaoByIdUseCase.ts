import { prisma } from '../../../../database/prismaClient';
import { distance, Coord } from '@turf/turf';

class ListAllSalaoByUseCase {
  async execute(salaoId: string) {
    const saloes = await prisma.saloes.findFirst({
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

    if (saloes && saloes.geo && saloes.geo.coordinates) {
      const salaoPoint: Coord = {
        type: 'Point',
        coordinates: saloes.geo.coordinates,
      };

      const calculatedDistance = distance(salaoPoint, targetPoint);
      const { id, nome, capa, geo } = saloes;

      response = {
        id,
        nome,
        capa,
        geo,
        distance: calculatedDistance,
      };
    } else {
      // Lógica para lidar com o caso em que saloes.geo.coordinates é nulo
      const { id, nome, capa } = saloes!;

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

export { ListAllSalaoByUseCase };
