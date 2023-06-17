import { prisma } from '../../../../database/prismaClient';
import { distance, Coord } from '@turf/turf';

class ListAllSalaoByUseCase {
  async execute(salaoId: string) {
    const salao = await prisma.salao.findFirst({
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

    if (salao && salao.geo && salao.geo.coordinates) {
      const salaoPoint: Coord = {
        type: 'Point',
        coordinates: salao.geo.coordinates,
      };

      const calculatedDistance = distance(salaoPoint, targetPoint);
      const { id, nome, capa, geo } = salao;

      response = {
        id,
        nome,
        capa,
        geo,
        distance: calculatedDistance,
      };
    } else {
      // Lógica para lidar com o caso em que salao.geo.coordinates é nulo
      const { id, nome, capa } = salao!;

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
