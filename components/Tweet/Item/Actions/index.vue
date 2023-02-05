<script lang="ts" setup>
const { tweet } = defineProps<{
  tweet: {
    repliesCount: number
  }
}>()

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100)
}
</script>
<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <div class="i-heroicons:chat-bubble-left-ellipsis" :class="classes" />
      </template>
      <template v-slot> {{ tweet.repliesCount }} </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="green">
      <template v-slot:icon="{ classes }">
        <div class="i-heroicons:arrow-path-rounded-square" :class="classes" />
      </template>
      <template v-slot> {{ generateRandomNumber() }} </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="red">
      <template v-slot:icon="{ classes }">
        <div class="i-heroicons:heart" :class="classes" />
      </template>
      <template v-slot> {{ generateRandomNumber() }} </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <div class="i-heroicons:arrow-up-tray" :class="classes" />
      </template>
      <template v-slot> {{ generateRandomNumber() }} </template>
    </TweetItemActionsIcon>
  </div>
</template>
