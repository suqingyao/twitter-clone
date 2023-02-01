import { User } from '@prisma/client'
import formidable from 'formidable'
import { createMediaFile } from '~~/server/db/mediaFiles'
import { createTweet } from '~~/server/db/tweets'
import { tweetTransformer } from '~~/server/transformers/tweet'

export default defineEventHandler(async (event) => {
  const form = formidable({})

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

  const { fields, files } = response as {
    fields: formidable.Fields
    files: formidable.Files
  }

  const userId = event.context?.auth?.user?.id as User['id']

  const tweetData = {
    text: fields.text as string,
    authorId: userId
  }

  const tweet = await createTweet(tweetData)

  const filePromises = Object.keys(files).map(async (key) => {
    return createMediaFile({
      url: '',
      // providerPublicId: 'random_id',
      userId: userId,
      tweetId: tweet.id
    })
  })

  await Promise.all(filePromises)

  return {
    tweet: tweetTransformer(tweet)
  }
})
