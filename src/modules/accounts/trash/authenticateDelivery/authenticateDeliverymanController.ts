// import { Request, Response } from 'express';
// import { AuthenticateDeliverymanUseCase } from './authenticateDeliverymanUseCase';

// class AuthenticateDeliverymanController {
//   async handle(request: Request, response: Response) {
//     try {
//       const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();

//       const { username, password } = request.body;

//       const result = await authenticateDeliverymanUseCase.execute({ username, password });

//       console.log('Clients autenticado com sucesso!');
//       return response.status(200).json(result);
//     } catch (error) {
//       console.log(error);
//       return response.status(500).json({ error: 'Failed to authenticate client' });
//     }
//   }
// }

// export { AuthenticateDeliverymanController };
