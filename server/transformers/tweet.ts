import { Tweet } from '@prisma/client'
import { formatDistance } from 'date-fns'
import { mediaFilesTransformer } from './mediaFiles'
import { userTransformer } from './user'
export const tweetTransformer = (tweet: Tweet) => {
  return {
    id: tweet.id,
    text: tweet.text,
    mediaFiles: !!tweet.mediaFiles
      ? tweet.mediaFiles.map(mediaFilesTransformer)
      : [],
    author: !!tweet.author ? userTransformer(tweet.author) : null,
    replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
    repliesCount: !!tweet.replies ? tweet.replies.length : 0,
    postedAt: formatDistance(tweet.createdAt, Date.now(), {
      addSuffix: true
    })
  }
}
