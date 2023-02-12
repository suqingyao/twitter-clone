import { RefreshToken, User } from '@prisma/client'
import { H3Event } from 'h3'
import jwt from 'jsonwebtoken'

const generateAccessToken = (user: User) => {
  const config = useRuntimeConfig()
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: '4h'
  })
}

const generateRefreshToken = (user: User) => {
  const config = useRuntimeConfig()
  return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
    expiresIn: '4h'
  })
}

export const decodeRefreshToken = (token: string): RefreshToken | null => {
  const config = useRuntimeConfig()
  try {
    return jwt.verify(token, config.jwtRefreshSecret) as RefreshToken
  } catch (error) {
    return null
  }
}

export const decodeAccessToken = (token: string): RefreshToken | null => {
  const config = useRuntimeConfig()
  try {
    return jwt.verify(token, config.jwtAccessSecret) as RefreshToken
  } catch (error) {
    return null
  }
}

export const generateTokens = (user: User) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return {
    accessToken,
    refreshToken
  }
}

export const sendRefreshToken = (event: H3Event, token: string) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true
  })
}
