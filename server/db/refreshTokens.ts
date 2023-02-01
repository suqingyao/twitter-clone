import { RefreshToken } from '@prisma/client'
import { prisma } from '.'

export const createRefreshToken = (
  refreshToken: Pick<RefreshToken, 'token' | 'userId'>
) => {
  return prisma.refreshToken.create({
    data: refreshToken
  })
}

export const getRefreshTokenByToken = (token: RefreshToken['token']) => {
  return prisma.refreshToken.findUnique({
    where: {
      token
    }
  })
}
