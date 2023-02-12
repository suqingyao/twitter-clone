import { Tweet } from '@prisma/client'

export default () => {
  const usePostTweetModal = () => useState('post_tweet_modal', () => false)
  const useReplyTweet = () => useState('reply_tweet', () => ({}))

  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = false
  }

  const openPostTweetModal = (tweet: Tweet) => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = true
    setReplyTo(tweet)
  }

  const setReplyTo = (tweet: Tweet) => {
    const replyTweet = useReplyTweet()
    replyTweet.value = tweet
  }

  const postTweet = (formData: {
    text: string
    replyTo: string
    mediaFiles: File[]
  }) => {
    const form = new FormData()
    form.append('text', formData.text)
    form.append('replyTo', formData.replyTo)

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append('media_file' + index, mediaFile)
    })
    return useFetchApi('/api/user/tweets', {
      method: 'POST',
      body: form
    }) as Promise<{ tweet: Tweet }>
  }

  const getHomeTweets = (): Promise<{ tweets: Tweet }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi('/api/tweets')
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  const getTweetById = (tweetId: string): Promise<{ tweet: Tweet }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await useFetchApi(`/api/tweets/${tweetId}`)
        resolve(response as { tweet: Tweet })
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    postTweet,
    getHomeTweets,
    getTweetById,
    closePostTweetModal,
    openPostTweetModal,
    usePostTweetModal,
    useReplyTweet
  }
}
