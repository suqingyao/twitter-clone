<script lang="ts" setup>
const {
  user,
  placeholder = `What's happening?`,
  count = 200
} = defineProps<{
  user: {
    profileImage: string
  }
  placeholder?: string
  count?: number
}>()

const emits = defineEmits<{
  (event: 'onSubmit', formData: { text: string; mediaFiles: File[] }): void
}>()

const text = ref('')
const overWorld = ref('')
const imageInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const inputImageUrl = ref('')
const edit = ref<HTMLDivElement | null>(null)

const isDisabled = computed(() => text.value === '')

watch(
  () => text.value,
  (newValue, oldValue) => {
    if (newValue.length > 10) {
      text.value = newValue.slice(0, 10)
      overWorld.value = newValue.slice(10)
    }
  }
)

const handleFormSubmit = () => {
  emits('onSubmit', {
    text: text.value,
    mediaFiles: [selectedFile.value!]
  })
}

const handleImageClick = () => {
  imageInput.value!.click()
}

const handleImageChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files![0]
  selectedFile.value = file

  const reader = new FileReader()
  reader.onload = (event) => {
    inputImageUrl.value = event.target?.result as string
  }
  reader.readAsDataURL(file)
}

const handleInputChange = (event: Event) => {
  text.value = (event.target as HTMLDivElement).innerHTML
}
</script>

<template>
  <div class="flex items-start flex-shrink-0 p-4 pb-0">
    <div class="flex w-12">
      <img
        :src="user?.profileImage"
        alt=""
        class="inline-block w-10 h-10 rounded-full"
      />
    </div>
    <div class="w-full p-2">
      <textarea
        v-model="text"
        :placeholder="placeholder"
        class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-none outline-none h-10 dark:text-white p-1"
      />
      <!-- <div
        ref="edit"
        contenteditable
        class="break-all h-auto text-lg border-none outline-none text-gray-900 dark:text-white bg-transparent select-text"
        @input="handleInputChange"
      >
        <div
          v-if="!text"
          contenteditable="false"
          class="outline-none text-gray-400"
        >
          {{ placeholder }}
        </div>
      </div> -->
    </div>
  </div>
  <!-- File Selector -->
  <div class="p-4 pl-16">
    <img
      v-if="inputImageUrl"
      :src="inputImageUrl"
      alt=""
      class="rounded-2xl border twitter-border-color"
    />
    <input
      type="file"
      ref="imageInput"
      hidden
      accept="image/png, image/jpg, image/gif image/jpeg"
      @change="handleImageChange"
    />
  </div>
  <!-- Icons -->
  <div class="flex p-2 pl-14 items-center">
    <div class="flex w-full text-white h-auto">
      <div
        class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer"
        @click="handleImageClick"
      >
        <IconImageFrame />
      </div>
      <div
        class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer"
      >
        <IconGif />
      </div>
      <div
        class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer"
      >
        <IconChat />
      </div>
      <div
        class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer"
      >
        <IconEmoji />
      </div>
      <div
        class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer"
      >
        <IconCalendar />
      </div>
    </div>
    <div class="ml-auto">
      <UIButton size="sm" :disabled="isDisabled" @on-click="handleFormSubmit">
        <span class="font-bold"> Tweet </span>
      </UIButton>
    </div>
  </div>
</template>
