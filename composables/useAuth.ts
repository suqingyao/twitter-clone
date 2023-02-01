import { RefreshToken } from '@prisma/client'
import jwtDecode from 'jwt-decode'
import { userTransformer } from '~~/server/transformers/user'
import useFetchApi from './useFetchApi'

export default () => {
  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')
  const useAuthLoading = () => useState('auth_loading', () => true)

  const setToken = (newToken: RefreshToken['token']) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }

  const setUser = (newUser: ReturnType<typeof userTransformer>) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }

  const setIsAuthLoading = (value: boolean) => {
    const authLoading = useAuthLoading()
    authLoading.value = value
  }

  const login = ({
    username,
    password
  }: {
    username: string
    password: string
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password
          }
        })
        setToken(data.access_token)
        setUser(data.user)
        resolve(true)
        console.log('🚀🚀🚀🚀', data)
      } catch (error) {
        reject(error)
      }
    })
  }

  const refreshToken = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh')
        setToken(data.refresh_token!?.token)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getUser = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/refresh')
        setUser((data as any).user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const reRefreshAccessToken = async () => {
    const authToken = useAuthToken()
    if (!authToken.value) {
      return
    }
    const jwt = jwtDecode(authToken.value as string) as {
      exp: number
      iat: number
      userId: string
    }

    const newRefreshTime = jwt.exp - 60000

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime)
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true)
      try {
        await refreshToken()
        await getUser()
        reRefreshAccessToken()
        resolve(true)
      } catch (error) {
        console.log(error)
        reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }

  return {
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading
  }
}
