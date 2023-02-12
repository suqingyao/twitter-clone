<script lang="ts" setup>
const { tweet, compact = false } = defineProps<{
  tweet: {
    repliesCount: number
  }
  compact?: boolean
}>()

const emits = defineEmits<{
  (event: 'on-comment-click'): void
}>()

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100)
}

const showStats = computed(() => compact)

const size = computed(() => (compact ? 5 : 8))
</script>
<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon
      color="blue"
      :size="size"
      @on-click="emits('on-comment-click')"
    >
      <template v-slot:icon="{ classes }">
        <div class="i-heroicons:chat-bubble-left-ellipsis" :class="classes" />
      </template>
      <template v-if="showStats" v-slot> {{ tweet.repliesCount }} </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <div class="i-heroicons:arrow-path-rounded-square" :class="classes" />
      </template>
      <template v-if="showStats" v-slot>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="red" :size="size">
      <template v-slot:icon="{ classes }">
        <div class="i-heroicons:heart" :class="classes" />
      </template>
      <template v-if="showStats" v-slot>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="blue" :size="size">
      <template v-slot:icon="{ classes }">
        <div class="i-heroicons:arrow-up-tray" :class="classes" />
      </template>
      <template v-if="showStats" v-slot>
        <span>
          {{ generateRandomNumber() }}
        </span>
      </template>
    </TweetItemActionsIcon>
  </div>
</template>
