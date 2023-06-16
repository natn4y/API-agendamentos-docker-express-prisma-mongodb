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

    const salaoPoint: Coord = {
      type: 'Point',
      coordinates: salao!.geo!.coordinates,
    };

    //Coordenada fictícia
    const targetPoint: Coord = {
      type: 'Point',
      coordinates: [-10.043858, -51.103487],
    };

    const calculatedDistance = distance(salaoPoint, targetPoint);
    const { id, nome, capa, geo } = salao!;

    return {
      id,
      nome,
      capa,
      geo,
      distance: calculatedDistance,
    };
  }
}

export { ListAllSalaoByUseCase };
