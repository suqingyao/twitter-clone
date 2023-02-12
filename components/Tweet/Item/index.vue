<script lang="ts" setup>
const {
  tweet,
  compact = false,
  hiddenActions = false
} = defineProps<{
  tweet: any
  compact?: boolean
  hiddenActions?: boolean
}>()

const emitter = useEmitter()

const tweetBodyWrapper = computed(() => (compact ? 'ml-16' : 'ml-2 mt-4'))

const textSize = computed(() => (compact ? 'text-base' : 'text-2xl'))

const handleCommentClick = () => {
  emitter.$emit('replyTweet', tweet)
}
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
      <div class="mt-2" v-if="!hiddenActions">
        <TweetItemActions
          :tweet="tweet"
          :compact="compact"
          @on-comment-click="handleCommentClick"
        />
      </div>
    </div>
  </div>
</template>
