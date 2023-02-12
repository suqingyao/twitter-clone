<script lang="ts" setup>
const { color, size = 5 } = defineProps<{
  color: string
  size?: number
}>()

const emits = defineEmits<{
  (event: 'on-click'): void
}>()
</script>

<template>
  <div
    @click.stop.prevent="emits('on-click')"
    class="flex items-center text-gray-400 cursor-pointer group"
  >
    <div
      :class="`p-2 group-hover:bg-${color}-100 group-hover:text-${color}-400 rounded-full default-transition dark:group-hover:bg-opacity-200`"
    >
      <slot name="icon" :classes="`w-${size}} h-${size}`" />
    </div>
    <span :class="`ml-1 group-hover:text-${color}-400`">
      <slot />
    </span>
  </div>
</template>
