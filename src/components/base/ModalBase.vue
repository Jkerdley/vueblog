<script setup>
import { useModalStore } from '@/stores/modal'
import BaseButton from './BaseButton.vue'

const modalStore = useModalStore()
</script>
<template>
  <div
    v-show="modalStore.isVisible"
    @click="modalStore.closeModal"
    class="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50"
  >
    <div class="w-1/3 min-w-xl rounded-2xl bg-white p-6">
      <p class="mb-6 text-center text-xl">{{ modalStore.message }}</p>
      <div class="flex items-center justify-end gap-4">
        <BaseButton
          @click="modalStore.closeModal"
          class="w-1/5 cursor-pointer rounded-lg bg-gray-300 p-2 hover:bg-gray-500"
        >
          Отмена
        </BaseButton>
        <BaseButton
          @click="modalStore.confirm"
          class="w-1/5 cursor-pointer rounded-lg bg-blue-300 p-2 hover:bg-blue-500"
        >
          Да
        </BaseButton>
      </div>
    </div>
  </div>
</template>
