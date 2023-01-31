import { userTransformer } from '~~/server/transformers/user'
import { getUserByUsername } from '~~/server/db/users'
import { generateTokens, sendRefreshToken } from '~~/server/utils/jwt'
import { createRefreshToken } from '~~/server/db/refreshTokens'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password } = body

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid params'
      })
    )
  }

  // Is the user registered
  const user = await getUserByUsername(username)
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid'
      })
    )
  }

  // Compare password
  const doesThePasswordMatch = await bcrypt.compare(password, password)

  if (!doesThePasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid'
      })
    )
  }

  // Generate Tokens
  // Access token
  // Refresh token
  const { accessToken, refreshToken } = generateTokens(user)

  // Save it inside db
  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  // Add http only cookie
  sendRefreshToken(event, refreshToken)

  return {
    access_token: accessToken,
    user: userTransformer(user)
  }
})
