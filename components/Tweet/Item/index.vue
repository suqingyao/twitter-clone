<script lang="ts" setup>
import { Tweet } from '@prisma/client'

const { tweet } = defineProps<{
  tweet: Tweet
}>()
</script>

<template>
  <div>
    <TweetItemHeader :tweet="tweet" />
    <div class="ml-16">
      <p class="flex-shrink font-medium text-gray-800 w-auto dark:text-white">
        {{ tweet.text }}
      </p>
      <div
        v-for="image of tweet.mediaFiles"
        :key="image.id"
        class="flex my-3 mr-2 border-2 rounded-2xl twitter-border-color"
      >
        <img :src="image.url" alt="" class="w-full rounded-2xl" />
      </div>
      <div class="mt-2">
        <TweetItemActions />
      </div>
    </div>
  </div>
</template>
