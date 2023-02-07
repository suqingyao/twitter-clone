<script lang="ts" setup>
import { Tweet } from '@prisma/client'

const { tweet, user } = defineProps<{
  tweet: any
  user: {
    profileImage: string
    name: string
    username: string
  }
}>()

const replies = computed(() => tweet?.replies || [])

const handleFormSuccess = (tweet: Tweet) => {
  navigateTo({
    path: `/status/${tweet.id}`
  })
}
</script>

<template>
  <div>
    <TweetItem :tweet="tweet" />
    <TweetForm
      placeholder="Tweet your reply"
      :reply-to="tweet"
      :user="user"
      @on-success="handleFormSuccess"
    />
    <TweetListFeed :tweets="replies" />
  </div>
</template>
