import { RefreshToken } from '@prisma/client'
import { H3Event } from 'h3'
import UrlPattern from 'url-pattern'
import { getUserById } from '../db/users'
import { decodeAccessToken } from '../utils/jwt'

export default defineEventHandler(async (event: H3Event) => {
  const endpoints = ['/api/auth/user']

  const isHandleByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint)

    return pattern.match(event.node.req.url!)
  })

  if (!isHandleByThisMiddleware) {
    return
  }

  const token = event.node.req.headers['authorization']?.split(' ')[1]

  const decoded = decodeAccessToken(token!) as RefreshToken

  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    )
  }

  try {
    const userId = decoded.userId
    const user = await getUserById(userId)
    event.context.auth = { user }
  } catch (error) {
    return
  }
})
