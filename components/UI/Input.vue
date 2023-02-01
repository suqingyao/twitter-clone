<script lang="ts" setup>
const { modelValue, type, placeholder, label } = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})

const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label
      :for="label"
      v-if="label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      :name="label"
      :value="modelValue"
      :placeholder="placeholder"
      @input="(event:Event) => emits('update:modelValue', (event.target as HTMLInputElement).value)"
      class="block px-4 py-2 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
</template>
