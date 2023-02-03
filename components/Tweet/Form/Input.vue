<script lang="ts" setup>
const { user } = defineProps<{
  user: {
    profileImage: string
  }
}>()

const emits = defineEmits<{
  (event: 'onSubmit', formData: { text: string; mediaFiles: File[] }): void
}>()

const text = ref('')
const imageInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const inputImageUrl = ref('')

const isDisabled = computed(() => text.value === '')

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
  const file = event.target?.files[0]
  selectedFile.value = file

  const reader = new FileReader()
  reader.onload = (event) => {
    inputImageUrl.value = event.target?.result as string
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div>
    <div class="flex items-center flex-shrink-0 p-4 pb-0">
      <div class="flex w-12 items-top">
        <img
          :src="user.profileImage"
          alt=""
          class="inline-block w-10 h-10 rounded-full"
        />
      </div>
      <div class="w-full p-2">
        <textarea
          v-model="text"
          placeholder="What's on your mind?"
          class="w-full h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring"
        />
      </div>
    </div>
    <!-- File Selector -->
    <div class="p-4 pl-16">
      <img
        :src="inputImageUrl"
        v-if="inputImageUrl"
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
    <div class="flex p-2 pl-14">
      <div class="flex w-full text-white">
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
        >
          <IconImageFrame @click="handleImageClick" />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
        >
          <IconGif />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
        >
          <IconChat />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
        >
          <IconEmoji />
        </div>
        <div
          class="p-2 text-blue-400 rounded-full hover:bg-blue-500 dark:hover:bg-dim-800 cursor-pointer"
        >
          <IconCalendar />
        </div>
      </div>
      <div class="ml-auto">
        <UIButton size="sm" :disabled="isDisabled" @on-click="handleFormSubmit">
          <span class="font-bold"> Tweet </span>
        </UIButton>
        <!-- <button type="button" @click="handleFormSubmit">Tweet</button> -->
      </div>
    </div>
  </div>
</template>
