<script lang="ts" setup>
defineOptions({
  name: 'SidebarLeft'
})

const { user } = defineProps<{
  user: any
}>()

const emits = defineEmits<{
  (event: 'on-tweet'): void
  (event: 'on-logout'): void
}>()
</script>

<template>
  <div class="flex h-screen flex-col text-center">
    <div
      class="my-2 w-min rounded-full p-2 hover:bg-blue-50 dark:hover:bg-white/20 default-transition"
    >
      <NuxtLink to="/">
        <LogoTwitter class="h-8 w-8" />
      </NuxtLink>
    </div>

    <div class="mt-2 space-y-3">
      <SidebarLeftTab active>
        <template #icon>
          <div class="i-heroicons-home-solid" />
        </template>
        <template #name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <div class="i-heroicons-hashtag" />
        </template>
        <template #name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <div class="i-heroicons-bell" />
        </template>
        <template #name> Notifications </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <div class="i-heroicons-inbox" />
        </template>
        <template #name> Messages </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <div class="i-heroicons-bookmark" />
        </template>
        <template #name> Bookmarks </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <div class="i-heroicons:document-text" />
        </template>
        <template #name> Lists </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <div class="i-heroicons-user" />
        </template>
        <template #name> Profile </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <div class="i-heroicons-ellipsis-horizontal-circle" />
        </template>
        <template #name> More </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg" @on-click="emits('on-tweet')">
          <span class="font-bold">Tweet</span>
        </UIButton>
      </div>
      <div class="block xl:hidden">
        <UIButton size="sm" @on-click="emits('on-tweet')">
          <div class="font-bold text-xl">
            <div class="i-heroicons-pencil" />
          </div>
        </UIButton>
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800 default-transition"
      @click="emits('on-logout')"
    >
      <div class="flex flex-row">
        <img
          :src="user.profileImage"
          alt="avatar"
          class="w-10 h-10 rounded-full"
        />
        <div class="flex hidden ml-2 xl:block">
          <h1 class="text-sm font-bold text-gray-800">
            {{ user.name }}
          </h1>
          <p class="text-sm text-gray-400">
            {{ user.handle }}
          </p>
        </div>
      </div>
      <!-- Icon -->
      <div class="hidden ml-auto xl:block">
        <div class="i-heroicons:ellipsis-horizontal-20-solid" />
      </div>
    </div>
  </div>
</template>
