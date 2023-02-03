<script lang="ts" setup>
let loading = ref(false)

const { useAuthUser } = useAuth()
const user = <any>useAuthUser()
</script>

<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <TweetForm :user="user" />
    </MainSection>
  </div>
</template>
