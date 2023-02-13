<script lang="ts" setup>
const formData = reactive({
  username: 'cullyfung',
  password: 'wqra',
  loading: false
})

const isButtonDisabled = computed(() => {
  return !formData.username || !formData.password || formData.loading
})

const handleLogin = async () => {
  const { login } = useAuth()
  formData.loading = true
  try {
    await login({
      username: formData.username,
      password: formData.password
    })
  } catch (error) {
    console.log(error)
  } finally {
    formData.loading = false
  }
}

onMounted(() => {
  handleLogin()
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>
    <div class="pt-5 space-y-6">
      <UIInput
        v-model="formData.username"
        label="Username"
        placeholder="@username"
      />
      <UIInput
        v-model="formData.password"
        label="Password"
        placeholder="@password"
        type="password"
      />
      <UIButton liquid :disabled="isButtonDisabled" @click="handleLogin">
        Login
      </UIButton>
    </div>
  </div>
</template>
