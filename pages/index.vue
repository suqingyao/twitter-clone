<script lang="ts" setup>
import { Tweet } from '@prisma/client'
const { getTweets } = useTweets()

defineOptions({
  name: 'Main'
})

let loading = ref(false)
const homeTweets = ref<Tweet[]>([])

const { useAuthUser } = useAuth()
const user = <any>useAuthUser()

onBeforeMount(async () => {
  loading.value = true
  try {
    const { tweets } = await getTweets()
    homeTweets.value = tweets
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const handleFormSuccess = (tweet: Tweet) => {
  navigateTo({
    path: `/status/${tweet.id}`
  })
}
</script>

<template>
  <MainSection title="Home" :loading="loading">
    <Head>
      <Title>Home / Twitter</Title>
    </Head>

    <div class="border-b twitter-border-color">
      <TweetForm :user="user" @on-success="handleFormSuccess" />
    </div>

    <TweetListFeed :tweets="homeTweets" />
  </MainSection>
</template>
