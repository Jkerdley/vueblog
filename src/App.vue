<script setup>
import LayoutContainer from './components/LayoutContainer.vue'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-gray-100">
    <header class="fixed top-0 right-0 left-0 bg-white">
      <LayoutContainer>Шапка</LayoutContainer>
    </header>
    <main class="mt-26 flex-1">
      <RouterView />
    </main>
    <footer class="bg-white"><LayoutContainer>Подвал</LayoutContainer></footer>
  </div>
</template>

<style scoped></style>
