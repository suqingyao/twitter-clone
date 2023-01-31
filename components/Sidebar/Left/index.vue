<script lang="ts" setup></script>

<template>
  <div class="flex h-screen flex-col">
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
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
