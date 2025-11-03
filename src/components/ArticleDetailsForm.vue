<script setup>
import { faFloppyDisk, faRotateLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useArticleStore } from '@/stores/article'
import { ref } from 'vue'
import { useModalStore } from '@/stores/modal'
import { useRouter } from 'vue-router'
import BaseInput from './base/BaseInput.vue'
const articleStore = useArticleStore()
const modalStore = useModalStore()
const editedArticle = ref({ ...articleStore.article })

const handleUpdatePost = () => {
  articleStore.updateArticle(editedArticle.value)
  articleStore.toggleEditMode()
}
const router = useRouter()
const handleDeleteArticle = () => {
  modalStore.openModal('Вы действительно хотите удалить статью?', async () => {
    const response = await articleStore.deleteArticle()
    if (!response?.error) {
      router.push('/')
    }
  })
  articleStore.toggleEditMode()
}
</script>

<template>
  <form @submit.prevent="handleUpdatePost" class="mb-8 rounded-md bg-white p-8 shadow-md">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="pr-1 text-3xl">{{ articleStore.article.title }}</h1>
      <div class="text-md flex gap-4">
        <button @click="articleStore.toggleEditMode" class="cursor-pointer hover:text-blue-400">
          <FontAwesomeIcon :icon="faRotateLeft" aria-label="отмена редактирования" />
        </button>
        <button type="submit" class="cursor-pointer hover:text-blue-400">
          <FontAwesomeIcon :icon="faFloppyDisk" aria-label="сохранить" />
        </button>
        <button @click="handleDeleteArticle" class="cursor-pointer hover:text-red-400">
          <FontAwesomeIcon :icon="faTrash" aria-label="удалить" />
        </button>
      </div>
    </div>
    <p class="mb-4">
      <BaseInput
        name="title"
        type="text"
        v-model="editedArticle.title"
        placeholder="Заголовок статьи"
      />
    </p>
    <p class="mb-4">
      <BaseInput
        type="text"
        name="imageUrl"
        v-model="editedArticle.imageUrl"
        placeholder="Изображение статьи"
      />
    </p>
    <p class="mb-4">
      <BaseInput
        as="textarea"
        name="content"
        v-model="editedArticle.content"
        placeholder="Контент статьи"
        rows="10"
      />
    </p>
  </form>
</template>
