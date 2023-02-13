import { removeRefreshToken } from '~~/server/db/refreshTokens'

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, 'refresh_token')
    removeRefreshToken(refreshToken!)
  } catch (error) {}

  sendRefreshToken(event, '')
  return {
    message: 'Done'
  }
})
