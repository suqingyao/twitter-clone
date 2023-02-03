<script lang="ts" setup>
const loading = ref(false)

const { user } = defineProps<{
  user: {
    profileImage: string
  }
}>()

const { postTweet } = useTweets()

const handleFormSubmit = async (data: { text: string; mediaFiles: File[] }) => {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles
    })

    console.log(response)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput :user="user" @on-submit="handleFormSubmit" />
    </div>
  </div>
</template>
