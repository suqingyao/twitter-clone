<script lang="ts" setup>
import { Tweet } from '@prisma/client'
const { getHomeTweets } = useTweets()

let loading = ref(false)
const homeTweets = ref<Tweet[]>([])

const { useAuthUser } = useAuth()
const user = <any>useAuthUser()

onBeforeMount(async () => {
  loading.value = true
  try {
    const { tweets } = await getHomeTweets()
    homeTweets.value = tweets as any
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <MainSection title="Home" :loading="loading">
    <Head>
      <Title>Home / Twitter</Title>
    </Head>

    <div class="border-b twitter-border-color">
      <TweetForm :user="user" />
    </div>

    <TweetListFeed :tweets="homeTweets" />
  </MainSection>
</template>
