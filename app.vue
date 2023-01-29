<script lang="ts" setup>
const darkMode = ref(false)
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div class="min-h-full">
        <div class="lg:gap=5 mx-auto grid grid-cols-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <!-- LEFT SIDEBAR -->
          <div class="xs-col-span-1 md:block xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>
          <!-- MAIN CONTENT -->

          <!-- RIGHT SIDEBAR -->
        </div>
      </div>
    </div>
  </div>
</template>
