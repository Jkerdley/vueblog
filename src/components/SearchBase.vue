<script setup>
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'

const props = defineProps({
  onSearch: {
    type: Function,
    required: true,
  },
})

const searchQuery = ref('')

const searchHandler = () => {
  props.onSearch(searchQuery.value)
}

let debouncedTimer = null
const debounceSearch = (query) => {
  clearTimeout(debouncedTimer)

  debouncedTimer = setTimeout(() => {
    props.onSearch(query)
  }, 1000)
}

watch(searchQuery, (newQuery) => {
  debounceSearch(newQuery)
})
</script>

<template>
  <form @submit.prevent="searchHandler" class="relative mt-12">
    <input
      v-model="searchQuery"
      type="text"
      name="search"
      id=""
      placeholder="Поиск по блогу"
      class="flex w-full rounded-md border border-gray-300 bg-white p-2 pr-20"
    />
    <button
      type="submit"
      class="absolute top-[50%] right-0 translate-y-[-50%] cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-300"
    >
      <FontAwesomeIcon :icon="faMagnifyingGlass" />
    </button>
  </form>
</template>

<style lang="scss" scoped></style>
