<script setup>
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'
import ButtonBase from './BaseButton.vue'

const props = defineProps({
  onSearch: {
    type: Function,
    required: true,
  },
})

const searchQuery = ref('')
let debouncedTimer = null

const searchHandler = () => {
  clearTimeout(debouncedTimer)
  props.onSearch({ search: searchQuery.value })
}

const debounceSearch = (query) => {
  clearTimeout(debouncedTimer)

  debouncedTimer = setTimeout(() => {
    props.onSearch({ search: query })
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
      class="flex w-full rounded-md border border-gray-300 bg-white p-2 py-2 pr-20"
    />
    <ButtonBase
      type="submit"
      class="absolute top-[50%] right-0 translate-y-[-50%] cursor-pointer transition-colors hover:bg-blue-300"
    >
      <FontAwesomeIcon :icon="faMagnifyingGlass" />
    </ButtonBase>
  </form>
</template>
