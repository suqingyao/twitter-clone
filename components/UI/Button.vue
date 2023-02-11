<script lang="ts" setup>
const {
  disabled = false,
  size = 'md',
  liquid = false
} = defineProps<{
  disabled?: boolean
  size?: 'sm' | 'lg' | 'md'
  liquid?: boolean
}>()

const emits = defineEmits<{
  (event: 'onClick', data: MouseEvent): void
}>()

const paddingClasses = computed(() => {
  switch (size) {
    case 'sm':
      return 'px-3 py-3'
    case 'lg':
      return 'px-5 py-3'
    default:
      return 'px-4 py-3'
  }
})

const textFontSize = computed(() => {
  switch (size) {
    case 'lg':
      return 'text-md'
    default:
      return 'text-sm'
  }
})

const defaultWidth = computed(() => {
  switch (size) {
    default:
      return 'w-min'
  }
})

const classes = computed(
  () => `${paddingClasses.value} ${liquid ? 'w-full' : defaultWidth.value}`
)

const handleClick = (event: MouseEvent) => {
  emits('onClick', event)
}
</script>

<template>
  <button
    class="flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed disabled:hover:bg-blue-300"
    :disabled="disabled"
    :class="classes"
    @click="handleClick"
  >
    <span :class="textFontSize">
      <slot />
    </span>
  </button>
</template>
