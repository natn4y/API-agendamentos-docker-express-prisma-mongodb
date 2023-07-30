import { prisma } from '@database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
  nome: string
  senha: string
}

class AuthenticateClientUseCase {
  // Receber Dados
  async execute({ nome, senha }: IAuthenticateClient) {
    // Verificar se username está cadastrado
    const client = await prisma.clients.findFirst({
      where: { nome: nome },
    })

    if (!client) {
      throw new Error('username or password invalid!')
    }

    // Verificar se a senha corresponde ao username
    const passwordMatch = await compare(senha, client.senha)

    if (!passwordMatch) {
      throw new Error('username or password invalid!')
    }

    // Gerar token
    const token = sign(
      {
        nome,
      },
      '96a284ffc8e6fc5e87671f070bf88118',
      {
        subject: client.id,
        expiresIn: '1d',
      },
    )

    return { token: token, clientId: client.id }
  }
}

export { AuthenticateClientUseCase }
