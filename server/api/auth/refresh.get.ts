import { RefreshToken } from '@prisma/client'
import { getRefreshTokenByToken } from '~~/server/db/refreshTokens'
import { getUserById } from '~~/server/db/users'
import { decodeRefreshToken } from '~~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token')

  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid'
      })
    )
  }

  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!rToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid'
      })
    )
  }

  const token = decodeRefreshToken(refreshToken) as RefreshToken

  try {
    const user = await getUserById(token.userId)

    const { accessToken } = generateTokens(user!)
    return {
      access_token: accessToken
    }
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Something went wrong'
      })
    )
  }

  return {
    refresh_token: rToken
  }
})
