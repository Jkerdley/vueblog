<script setup>
import { useArticleStore } from '@/stores/article'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/utils/dateFormaters'
import { faCalendar, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
const articleStore = useArticleStore()
const modalStore = useModalStore()
const userStore = useUserStore()

defineProps({
  dateOptions: {
    type: Object,
  },
})
const router = useRouter()
const handleDeleteArticle = () => {
  modalStore.openModal('Вы действительно хотите удалить статью?', async () => {
    const response = await articleStore.deleteArticle()
    if (!response?.error) {
      router.push('/')
    }
  })
}
</script>

<template>
  <section class="mb-8 rounded-md bg-white px-8 pt-8 shadow-md">
    <div class="mb-4 bg-gray-100">
      <img
        class="h-64 w-full rounded-md object-cover"
        :src="articleStore.article.imageUrl"
        alt=""
      />
    </div>
    <p class="mb-4 flex items-center gap-1 text-gray-600">
      <FontAwesomeIcon :icon="faCalendar" aria-label="дата" />
      <time :datetime="articleStore.article.publishedAt">
        {{ formatDate(articleStore.article.publishedAt, dateOptions) }}
      </time>
    </p>
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-3xl">{{ articleStore.article.title }}</h1>
      <div v-if="userStore.user.roleId === 0" class="text-md flex gap-4">
        <button @click="articleStore.toggleEditMode" class="cursor-pointer hover:text-blue-400">
          <FontAwesomeIcon :icon="faPenToSquare" aria-label="редактировать" />
        </button>
        <button @click="handleDeleteArticle" class="cursor-pointer hover:text-red-400">
          <FontAwesomeIcon :icon="faTrash" aria-label="удалить" />
        </button>
      </div>
    </div>
    <div class="flex justify-between pb-4 whitespace-pre-wrap">
      {{ articleStore.article.content }}
    </div>
  </section>
</template>
