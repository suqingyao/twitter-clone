<script lang="ts" setup>
import { Tweet } from '@prisma/client'

defineOptions({
  name: 'Search'
})

const { getTweets: getTweetsComposable } = useTweets()

const loading = ref(false)
const searchTweets = ref<Tweet[]>([])
const searchQuery = useRoute().query.q

watch(
  () => useRoute().fullPath,
  () => {
    getTweets()
  }
)

onBeforeMount(() => {
  getTweets()
})

const getTweets = async () => {
  loading.value = true
  try {
    const { tweets } = await getTweetsComposable({
      query: searchQuery
    })
    searchTweets.value = tweets
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <MainSection title="Search" :loading="loading">
    <Head>
      <Title>Search</Title>
    </Head>
    <TweetListFeed :tweets="searchTweets" />
  </MainSection>
</template>
