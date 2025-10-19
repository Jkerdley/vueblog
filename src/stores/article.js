import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
  const article = ref({})
  const isInEditMode = ref(false)
  const fetchArticle = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`)

      if (!response.ok) {
        throw new Error('Ошибка получения статьи')
      }

      const result = await response.json()

      if (result.data) {
        article.value = result.data
      }
      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  const toggleEditMode = () => {
    isInEditMode.value = !isInEditMode.value
  }

  const addArticle = async (newArticle) => {
    try {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      })

      if (!response.ok) {
        throw new Error('Ошибка создания статьи')
      }

      const result = await response.json()
      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateArticle = async ({ title, content, imageUrl }) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title || article.value.title,
          content: content || article.value.content,
          imageUrl: imageUrl || article.value.imageUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка обновления статьи')
      }

      const result = await response.json()
      if (result.data) {
        article.value = result.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteArticle = async () => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления статьи')
      }
      const result = await response.json()

      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}/comments/${commentId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления комментария')
      }
      const result = await response.json()
      article.value.comments = article.value.comments.filter((comment) => comment.id !== commentId)
      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  const addComment = async (newComment) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      })

      if (!response.ok) {
        throw new Error('Ошибка добавления комментария')
      }

      const result = await response.json()
      if (result.data) {
        article.value.comments.push(result.data)
      }
      return result
    } catch (error) {
      console.error(error)
    }
  }

  return {
    article,
    fetchArticle,
    isInEditMode,
    toggleEditMode,
    addArticle,
    updateArticle,
    deleteArticle,
    addComment,
    deleteComment,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticleStore, import.meta.hot))
}
