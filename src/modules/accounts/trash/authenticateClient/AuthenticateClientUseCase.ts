import { prisma } from '@database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateClient {
  username: string;
  password: string;
}

class AuthenticateClientUseCase {
  // Receber Dados
  async execute({ username, password }: IAuthenticateClient) {
    // Verificar se username está cadastrado
    const client = await prisma.clients.findFirst({
      where: { username }
    })

    if(!client) {
      throw new Error("username or password invalid!");
    }

    // Verificar se a senha corresponde ao username
    const passwordMatch = await compare(password , client.password)

    if(!passwordMatch) {
      throw new Error("username or password invalid!");
    }

    // Gerar token
    const token = sign({
      username
    }, "96a284ffc8e6fc5e87671f070bf88118", {
      subject: client.id,
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateClientUseCase }