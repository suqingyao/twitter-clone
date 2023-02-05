<script lang="ts" setup>
const { color } = defineProps<{
  color: string
}>()
</script>

<template>
  <div class="flex items-center text-gray-400 cursor-pointer group">
    <div
      :class="`p-2 group-hover:bg-${color}-100 group-hover:text-${color}-400 rounded-full default-transition dark:group-hover:bg-opacity-200`"
    >
      <slot name="icon" classes="w-5 h-5" />
    </div>
    <span :class="`ml-1 group-hover:text-${color}-400`">
      <slot />
    </span>
  </div>
</template>
