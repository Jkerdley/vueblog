<script setup>
import { useArticleStore } from '@/stores/article'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/utils/dateFormaters'
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
const userStore = useUserStore()
const articleStore = useArticleStore()
const modalStore = useModalStore()

defineProps({
  dateOptions: {
    type: Object,
  },
  comment: {
    type: Object,
    required: true,
  },
})
const errorMessage = ref('')

const handleDeleteComment = (commentId) => {
  modalStore.openModal('Вы действительно хотите удалить комментарий?', async () => {
    const response = await articleStore.deleteComment(commentId)
    if (response?.error) {
      errorMessage.value = response.error
    }
    errorMessage.value = ''
  })
}
</script>

<template>
  <ul>
    <li class="mb-4 rounded-md bg-white p-4 shadow-md">
      <div class="mb-1 flex justify-between">
        <p class="font-bold">
          <FontAwesomeIcon :icon="faUser" aria-label="автор" />
          &nbsp; {{ comment.author }}
        </p>
        <button
          @click="handleDeleteComment(comment.id)"
          v-if="userStore.isAdmin || userStore.isModerator"
          class="cursor-pointer text-red-400 hover:text-red-600"
        >
          <FontAwesomeIcon :icon="faTrash" aria-label="удалить" /> удалить
        </button>
      </div>
      <p class="mb-1 text-sm text-gray-500">
        <time :datetime="comment.publishedAt">
          {{ formatDate(comment.publishedAt, dateOptions) }}
        </time>
      </p>
      <div class="whitespace-pre-wrap">{{ comment.content }}</div>
    </li>
  </ul>
  <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
</template>
