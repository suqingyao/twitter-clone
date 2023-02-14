<script lang="ts" setup>
const { active, to } = defineProps<{
  active?: boolean
  to?: string
}>()

const textCls = computed(() => (active ? 'font-semibold' : 'font-normal'))
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex w-min items-center rounded-full p-3 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-dim-200 default-transition"
  >
    <div class="text-dark text-xl text-black dark:text-white">
      <slot name="icon" />
    </div>
    <div class="ml-4 hidden text-xl xl:block" :class="textCls">
      <slot name="name" />
    </div>
  </NuxtLink>
</template>
