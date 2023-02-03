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

  return {
    postTweet
  }
}
