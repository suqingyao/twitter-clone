<script lang="ts" setup>
import { Tweet } from '@prisma/client'

const loading = ref(false)

const {
  user,
  placeholder,
  replyTo = {}
} = defineProps<{
  user: {
    profileImage: string
    name: string
    username: string
  }
  placeholder: string
  replyTo?: Tweet
}>()

const emits = defineEmits<{
  (event: 'on-success', data: Tweet): void
}>()

const { postTweet } = useTweets()

const handleFormSubmit = async (data: {
  text: string
  mediaFiles: File[]
  replyTo: string
}) => {
  loading.value = true
  try {
    const response: { tweet: Tweet } = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
      replyTo: (replyTo as any)?.id as string
    })

    emits('on-success', response.tweet)
    console.log(
      '%cMyProject%cline:29%cresponse',
      'color:#fff;background:#ee6f57;padding:3px;border-radius:2px',
      'color:#fff;background:#1f3c88;padding:3px;border-radius:2px',
      'color:#fff;background:rgb(227, 160, 93);padding:3px;border-radius:2px',
      response
    )
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput
        :user="user"
        @on-submit="handleFormSubmit"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
