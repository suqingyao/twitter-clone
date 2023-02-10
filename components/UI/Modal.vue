<script lang="ts" setup>
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

const emits = defineEmits<{
  (event: 'on-close'): void
  (event: 'update:modelValue', value: boolean): void
}>()

const { modelValue } = defineProps<{
  modelValue: boolean
}>()

const onClose = () => {
  emits('on-close')
}
</script>

<template>
  <Dialog :open="modelValue" @close="onClose">
    <DialogPanel>
      <DialogTitle><slot name="title" /></DialogTitle>
      <DialogDescription>
        <slot name="description" />
      </DialogDescription>
      <slot />
    </DialogPanel>
  </Dialog>
</template>
