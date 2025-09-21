<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  onPageChanges: {
    type: Function,
    required: true,
  },
})

const goToPage = (page) => {
  props.onPageChanges({ page })
}

const activeClass = 'underline hover:text-blue-400 cursor-pointer'
const disabledClass = 'text-gray-400 cursor-default'
</script>

<template>
  <ul class="flex items-center justify-center gap-4 py-10">
    <li>
      <button
        @click="goToPage(1)"
        :disabled="currentPage === 1"
        :class="currentPage === 1 ? disabledClass : activeClass"
      >
        В начало
      </button>
    </li>
    <li>
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="currentPage === 1 ? disabledClass : activeClass"
      >
        Предыдущая
      </button>
    </li>
    <li>
      {{ currentPage }}
    </li>
    <li>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="currentPage === totalPages ? disabledClass : activeClass"
      >
        Следующая
      </button>
    </li>
    <li>
      <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
        :class="currentPage === totalPages ? disabledClass : activeClass"
      >
        В конец
      </button>
    </li>
  </ul>
</template>

<style scoped></style>
