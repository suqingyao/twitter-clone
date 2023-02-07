<script lang="ts" setup>
const { tweet, compact = false } = defineProps<{
  tweet: any
  compact?: boolean
}>()

const tweetBodyWrapper = computed(() => (compact ? 'ml-16' : 'ml-2 mt-4'))

const textSize = computed(() => (compact ? 'text-base' : 'text-2xl'))
</script>

<template>
  <div>
    <TweetItemHeader :tweet="tweet" />
    <div :class="tweetBodyWrapper">
      <p
        class="flex-shrink font-medium text-gray-800 w-auto dark:text-white"
        :class="textSize"
      >
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
        <TweetItemActions :tweet="tweet" :compact="compact" />
      </div>
    </div>
  </div>
</template>
