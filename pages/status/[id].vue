<script lang="ts" setup>
import { Tweet } from '@prisma/client'

const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()
const user = useAuthUser()
const loading = ref(false)
const tweet = ref<Tweet | null>(null)

watch(
  () => useRoute().fullPath,
  () => getTweet()
)

onBeforeMount(() => {
  getTweet()
})

const getTweetIdFromRoute = () => {
  return useRoute().params?.id as string
}

const getTweet = async () => {
  loading.value = true
  try {
    const response = await getTweetById(getTweetIdFromRoute())
    tweet.value = response.tweet
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>
      <TweetDetails :tweet="tweet" :user="user" />
    </MainSection>
  </div>
</template>
