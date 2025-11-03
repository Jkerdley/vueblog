<script setup>
import { useRoute } from 'vue-router'
import ModalBase from './components/base/ModalBase.vue'
import LayoutFooter from './components/layout/LayoutFooter.vue'
import LayoutHeader from './components/layout/LayoutHeader.vue'
import { useUserStore } from './stores/user'
import { computed } from 'vue'
import AccessDeniedView from './views/AccessDeniedView.vue'

const route = useRoute()
const userStore = useUserStore()

const isAccessGranted = computed(() => {
  if (route.meta?.requireAdmin) {
    if (userStore.isAdmin) {
      return true
    } else {
      return false
    }
  }
  return true
})
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-gray-100">
    <LayoutHeader />
    <main class="mt-26 flex-1">
      <RouterView v-if="isAccessGranted" />
      <AccessDeniedView v-else />
    </main>
    <LayoutFooter />
  </div>
  <ModalBase />
</template>

<style scoped></style>
