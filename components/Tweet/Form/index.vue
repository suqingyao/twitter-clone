<script lang="ts" setup>
import { Tweet } from '@prisma/client'

defineOptions({
  name: 'TweetForm'
})

const loading = ref(false)

const {
  user,
  placeholder = `What's happening?`,
  replyTo = null,
  showReply = false
} = defineProps<{
  user: {
    profileImage: string
    name: string
    username: string
  }
  placeholder?: string
  replyTo?: Tweet
  showReply?: boolean
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
      <TweetItem :tweet="replyTo" v-if="replyTo && showReply" hidden-actions />
      <TweetFormInput
        :user="user"
        @on-submit="handleFormSubmit"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
