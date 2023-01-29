<script lang="ts" setup>
const darkMode = ref(false)
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div class="min-h-full">
        <div
          class="lg:gap-10 mx-auto grid grid-cols-12 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <!-- LEFT SIDEBAR -->
          <div class="hidden md:block sm:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>
          <!-- MAIN CONTENT -->
          <main class="col-span-12 md:col-span-8 xl:col-span-4 bg-red-500">
            <h1>ads</h1>
          </main>
          <!-- RIGHT SIDEBAR -->
          <div class="hidden md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
