import { Tweet } from '@prisma/client'
import { prisma } from '.'

export type TweetData = Pick<Tweet, 'authorId' | 'text'>

export const createTweet = (
  tweetData: TweetData & { providerPublicId: string }
) => {
  return prisma.tweet.create({
    data: tweetData
  })
}
