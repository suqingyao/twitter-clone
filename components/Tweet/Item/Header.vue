<script lang="ts" setup>
type Tweet = {
  id: string
  name: string
  author: {
    name: string
    profileImage: string
    handle: string
  }
  replyTo?: Tweet
  postedAt: string
}

const { tweet } = defineProps<{
  tweet: Tweet
}>()

const author = tweet.author

const replyToTweetUrl = computed(() => `/status/${tweet?.replyTo?.id}`)
</script>
<template>
  <div class="p-4 flex">
    <div>
      <img
        :src="author.profileImage"
        :alt="author.name"
        class="w-10 h-10 rounded-full"
      />
    </div>
    <div class="ml-3">
      <span class="font-medium text-gray-800 dark:text-white">
        {{ author.name }}
      </span>
      <span class="ml-3 text-sm font-medium text-gray-400">
        <NuxtLink to="#">{{ author.handle }}</NuxtLink>
        .
        {{ tweet.postedAt }}
      </span>
      <p v-if="tweet?.replyTo" class="text-sm">
        <span class="text-gray-500"> Replying to </span>

        <NuxtLink :to="replyToTweetUrl" class="text-blue-400">
          {{ tweet?.replyTo?.author?.handle }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
