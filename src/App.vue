<script setup>
import LayoutContainer from './components/LayoutContainer.vue'
import LayoutHeader from './components/LayoutHeader.vue'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-gray-100">
    <LayoutHeader />
    <main class="mt-26 flex-1">
      <RouterView />
    </main>
    <footer class="bg-white"><LayoutContainer>Подвал</LayoutContainer></footer>
  </div>
</template>

<style scoped></style>
