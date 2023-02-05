<script lang="ts" setup>
const loading = ref(false)
</script>

<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>
    </MainSection>
  </div>
</template>
