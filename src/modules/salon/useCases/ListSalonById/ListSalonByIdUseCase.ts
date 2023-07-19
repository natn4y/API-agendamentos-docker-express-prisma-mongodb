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
        foto: true,
        capa: true,
        email: true,
        telefone: true,
        enderecoId: true,
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
      const { id, nome, foto, capa, email, telefone, geo, enderecoId } = salons;

      response = {
        id,
        nome,
        foto,
        capa,
        email,
        telefone,
        geo,
        distance: calculatedDistance,
        enderecoId,
      };
    } else {
      // Lógica para lidar com o caso em que salons.geo.coordinates é nulo
      const { id, nome, foto, capa, email, telefone, enderecoId } = salons!;

      response = {
        id,
        nome,
        foto,
        capa,
        email,
        telefone,
        geo: null,
        distance: null,
        enderecoId,
      };
    }

    return response;
  }
}

export { ListSalonByIdUseCase };
