<script setup>
import { useArticleStore } from '@/stores/article'
import BaseButton from './base/BaseButton.vue'
import { ref } from 'vue'

const articlesStore = useArticleStore()
const newComment = ref('')
const errorMessage = ref('')

const handleSubmitNewComment = async () => {
  if (newComment.value.trim() === '') {
    errorMessage.value = 'Введите комментарий'
    return
  }
  const response = await articlesStore.addComment(newComment.value)
  if (response.error) {
    errorMessage.value = response.error
    return
  }
  errorMessage.value = ''
  newComment.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmitNewComment" class="mb-8 rounded-md bg-white p-6 shadow-md">
    <label for="newComment" class="block text-gray-800">Ваш комментарий</label>
    <textarea
      v-model="newComment"
      name="newComment"
      id="newComment"
      class="mb-4 w-full rounded-md border-1 border-gray-300 p-2"
    ></textarea>
    <div class="flex justify-between">
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      <BaseButton type="submit" class="ml-auto"> Отправить </BaseButton>
    </div>
  </form>
</template>
