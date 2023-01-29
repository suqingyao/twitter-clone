<script lang="ts" setup>
const { title } = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    class="m-2 border bg-gray-50 twitter-border-color rounded-2xl bg-gray-50 dark:bg-dim-700 overflow-hidden"
  >
    <h1
      class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white twitter-border-color"
    >
      {{ title }}
    </h1>
    <slot />
    <div
      class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 default-transition"
    >
      Show more
    </div>
  </div>
</template>
