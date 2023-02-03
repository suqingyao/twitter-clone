<script lang="ts" setup>
const { title, loading } = defineProps<{
  title: string
  loading: boolean
}>()
</script>

<template>
  <div class="border-x twitter-border-color">
    <div
      class="sticky top-0 px-4 py-3 text-white/80 backdrop-blur-md dark:bg-dim-900/80"
    >
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
        {{ title }}
      </h2>
    </div>
    <div
      v-if="loading"
      class="flex items-center justify-center p-4 border-b twitter-border-color"
    >
      <UISpinner />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
