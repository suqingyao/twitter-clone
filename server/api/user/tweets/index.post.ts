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

  const replyTo = fields.replyTo

  if (replyTo && replyTo !== 'null' && replyTo !== 'undefined') {
    tweetData.replyToId = replyTo
  }

  const tweet = await createTweet(tweetData)

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key] as formidable.File

    const cloudinaryResource = await uploadToCloudinary(file.filepath)

    return createMediaFile({
      url: cloudinaryResource.secret_url,
      providerPublicId: cloudinaryResource.public_id,
      userId: userId,
      tweetId: tweet.id
    })
  })

  await Promise.all(filePromises)

  return {
    tweet: tweetTransformer(tweet)
  }
})
