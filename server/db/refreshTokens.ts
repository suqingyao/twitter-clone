import { RefreshToken } from '@prisma/client'
import { prisma } from '.'

export const createRefreshToken = (
  refreshToken: Pick<RefreshToken, 'token' | 'userId'>
) => {
  return prisma.refreshToken.create({
    data: refreshToken
  })
}
