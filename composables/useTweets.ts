import { Tweet } from '@prisma/client'

export default () => {
  const postTweet = (formData: { text: string; mediaFiles: File[] }) => {
    const form = new FormData()
    form.append('text', formData.text)

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append('media_file' + index, mediaFile)
    })
    return useFetchApi('/api/user/tweets', {
      method: 'POST',
      body: form
    })
  }

  const getHomeTweets = (): Promise<{ tweets: Tweet }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi('/api/tweets', {
          method: 'POST'
        })
        console.log(response)
        resolve(response as { tweets: Tweet })
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    postTweet,
    getHomeTweets
  }
}
