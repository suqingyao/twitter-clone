<script lang="ts" setup>
import { Tweet } from '@prisma/client'

const darkMode = ref(false)
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth()
const isAuthLoading = useAuthLoading()
const user = useAuthUser()
const {
  closePostTweetModal,
  openPostTweetModal,
  usePostTweetModal,
  useReplyTweet
} = useTweets()

const postTweetModal = usePostTweetModal()
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on('replyTweet', (tweet: any) => {
  openPostTweetModal(tweet)
})

emitter.$on('toggleDarkMode', (value: any) => {
  darkMode.value = value
})

onBeforeMount(() => {
  initAuth()
})

const handleOpenTweetModal = () => {
  openPostTweetModal({} as Tweet)
}

const handleModalClose = () => {
  closePostTweetModal()
}

const handleFormSuccess = (tweet: Tweet) => {
  closePostTweetModal()
  navigateTo({
    path: `/status/${tweet.id}`
  })
}

const handleUserLogout = () => {
  logout()
}
</script>

<template>
  <div id="app" :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isAuthLoading" />

      <!-- APP -->
      <div v-else-if="user" class="min-h-full">
        <div
          class="mx-auto grid grid-cols-12 sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- LEFT SIDEBAR -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft
                :user="user"
                @on-tweet="handleOpenTweetModal"
                @on-logout="handleUserLogout"
              />
            </div>
          </div>
          <!-- MAIN CONTENT -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>
          <!-- RIGHT SIDEBAR -->
          <div class="hidden md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <!-- Unauthorized -->
      <AuthPage v-else />
    </div>
    <!-- Tweet Modal -->
    <UIModal :is-open="postTweetModal" @on-close="handleModalClose">
      <TweetForm
        :reply-to="(replyTweet as Tweet)"
        show-reply
        :user="(user as any)"
        @on-success="handleFormSuccess"
      />
    </UIModal>
  </div>
</template>
