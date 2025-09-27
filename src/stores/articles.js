import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const searchQuery = ref('')

  const fetchArticles = async (args) => {
    const { search, page } = args || {}
    const isNewSearch = search !== undefined && search !== searchQuery.value

    if (isNewSearch) {
      currentPage.value = 1
      searchQuery.value = search
    } else {
      currentPage.value = page || currentPage.value
    }

    try {
      const response = await fetch(
        `/api/posts?search=${searchQuery.value}&limit=6&page=${currentPage.value}`,
      )
      if (!response.ok) {
        throw new Error()
      }
      const data = await response.json()

      articles.value = data.data.posts
      totalPages.value = data.data.lastPage
    } catch (error) {
      console.error(error)
    }
  }

  return { articles, fetchArticles, totalPages, currentPage }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
}
