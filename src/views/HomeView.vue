<script setup>
import ArticlesList from '@/components/ArticlesList.vue'
import LayoutContainer from '@/components/LayoutContainer.vue'
import SearchBase from '@/components/SearchBase.vue'
import PaginationBase from '@/components/PaginaionBase.vue'

import { useArticlesStore } from '@/stores/articles'

const articlesStore = useArticlesStore()
</script>

<template>
  <main>
    <LayoutContainer>
      <SearchBase :on-search="articlesStore.fetchArticles" />
      <ArticlesList />
      <PaginationBase
        v-if="articlesStore.totalPages > 1"
        :current-page="articlesStore.currentPage"
        :total-pages="articlesStore.totalPages"
        :on-page-changes="articlesStore.fetchArticles"
      />
    </LayoutContainer>
  </main>
</template>
