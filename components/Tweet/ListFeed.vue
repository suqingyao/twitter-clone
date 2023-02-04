<script setup lang="ts">
import { Tweet } from '@prisma/client'

const { tweets } = defineProps<{
  tweets: Tweet[]
}>()

const isEmptyArray = computed(() => tweets.length === 0)
</script>
<template>
  <div>
    <div v-if="isEmptyArray">
      <p class="text-center text-gray-500">No tweets were found</p>
    </div>

    <div
      v-else
      class="pb-4 border-b twitter-border-color hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300 default-transition"
      v-for="tweet of tweets"
      :key="tweet.id"
    >
      <TweetItem :tweet="tweet">
        {{ tweet }}
      </TweetItem>
    </div>
  </div>
</template>
