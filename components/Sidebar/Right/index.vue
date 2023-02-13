<script lang="ts" setup>
defineOptions({
  name: 'SidebarRight'
})

const search = ref('')

const emitter = useEmitter()

const isDark = ref(false)

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

const handleSearch = () => {
  useRouter().push({
    path: `/search`,
    query: {
      q: search.value
    }
  })
}

const handleToggleDarkMode = (value: boolean) => {
  isDark.value = value
  emitter.$emit('toggleDarkMode', value)
}
</script>

<template>
  <div class="flex flex-col">
    <!-- Search bar -->
    <div class="relative m-2">
      <div
        class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer"
      >
        <div
          class="i-heroicons:magnifying-glass w-6 h-6"
          @click="handleSearch"
        />
      </div>
      <input
        v-model="search"
        class="flex items-center w-full pl-12 text-sm font-normal text-black rk:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border-blue-200 h-9"
        type="text"
        placeholder="Search Twitter"
      />
    </div>

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

    <footer>
      <div class="ml-2 text-lg flex items-center gap-2">
        <div
          v-if="isDark"
          class="i-heroicons:sun cursor-pointer text-gray-200"
          @click="handleToggleDarkMode(false)"
        />
        <div
          v-else
          class="i-heroicons:moon cursor-pointer text-dim-400"
          @click="handleToggleDarkMode(true)"
        />
      </div>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Privacy Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Cookie Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Accessability</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Ads info</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">More</a>
        </li>
        <li class="inline-block mx-2">@ 2023 Twitter, Inc.</li>
      </ul>
    </footer>
  </div>
</template>
