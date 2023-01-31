import { RefreshToken, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'

const generateAccessToken = (user: User) => {
  const config = useRuntimeConfig()
  return jwt.sign(
    {
      userId: user.id
    },
    config.jwtAccessSecret,
    {
      expiresIn: '10m'
    }
  )
}

const generateRefreshToken = (user: User) => {
  const config = useRuntimeConfig()
  return jwt.sign(
    {
      userId: user.id
    },
    config.jwtAccessSecret,
    {
      expiresIn: '4h'
    }
  )
}

export const generateTokens = (user: User) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return {
    accessToken,
    refreshToken
  }
}

export const sendRefreshToken = (
  event: H3Event,
  token: RefreshToken['token']
) => {
  setCookie(event, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true
  })
}
