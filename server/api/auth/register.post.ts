import { createUser } from '~/server/db/users'
import { sendError } from 'h3'
import { userTransformer } from '~~/server/transformers/user'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, email, password, repeatPassword, name } = body
  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Invalid params' })
    )
  }

  if (password !== repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: 'Password do not match' })
    )
  }

  const user = await createUser({
    username,
    email,
    password,
    name,
    profileImage: 'https://picsum.photos/200/200'
  })

  return {
    body: userTransformer(user)
  }
})
