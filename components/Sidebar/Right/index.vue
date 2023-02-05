<script lang="ts" setup>
defineOptions({
  name: 'SidebarRight'
})
const whatsHappeningItems = ref<Array<{ title: string; count: string }>>([
  {
    title: 'SpaceX',
    count: '18.8k Tweets'
  },
  {
    title: '#Coding',
    count: '8.8k Tweets'
  },
  {
    title: '#artforall',
    count: '18.8k Tweets'
  }
])

const whoToFollowItems = ref([
  {
    name: 'Cully Fung',
    handle: '@cully_fung',
    avatar: 'https://picsum.photos/200/200'
  },
  {
    name: 'Cully Fung',
    handle: '@cully_fung',
    avatar: 'https://picsum.photos/200/200'
  },
  {
    name: 'Cully Fung',
    handle: '@cully_fung',
    avatar: 'https://picsum.photos/200/200'
  }
])
</script>

<template>
  <div class="flex flex-col">
    <!-- Preview Card : What's happening -->
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem
        v-for="(whatsHappening, index) in whatsHappeningItems"
        :key="index"
      >
        <div>
          <h2 class="font-bold text-gray-800 text-lg dark:text-white">
            {{ whatsHappening.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
    <!-- Preview Card : Who to follow -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem
        v-for="(whoToFollow, index) in whoToFollowItems"
        :key="index"
      >
        <div class="flex justify-between items-center p-2">
          <div class="flex">
            <img
              :src="whoToFollow.avatar"
              :alt="whoToFollow.name"
              class="w-10 h-10 object-cover rounded-full"
            />
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollow.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>
