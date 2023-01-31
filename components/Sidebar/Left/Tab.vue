<script lang="ts" setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: ''
  }
})

const textCls = computed(() => (props.active ? 'font-semibold' : 'font-normal'))
</script>

<template>
  <NuxtLink
    to="#"
    class="flex w-min items-center rounded-full p-3 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-dim-200 default-transition"
  >
    <div class="text-dark text-xl">
      <slot name="icon" />
    </div>
    <div class="ml-4 hidden text-xl xl:block" :class="textCls">
      <slot name="name" />
    </div>
  </NuxtLink>
</template>
