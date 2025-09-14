<script setup>
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-gray-100">
    <LayoutHeader />
    <main class="mt-26 flex-1">
      <RouterView />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped></style>
