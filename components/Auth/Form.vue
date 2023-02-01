<script lang="ts" setup>
const formData = reactive({
  username: '',
  password: '',
  loading: false
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
</script>

<template>
  <div>
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
      <div>
        <button type="button" @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>
