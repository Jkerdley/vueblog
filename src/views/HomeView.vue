<script setup>
import ArticlesList from '@/components/ArticlesList.vue'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import BaseSearch from '@/components/base/BaseSearch.vue'
import BasePaginaion from '@/components/base/BasePaginaion.vue'

import { useArticlesStore } from '@/stores/articles'

const articlesStore = useArticlesStore()
</script>

<template>
  <main>
    <LayoutContainer>
      <BaseSearch :on-search="articlesStore.fetchArticles" />
      <ArticlesList />
      <BasePaginaion
        v-if="articlesStore.totalPages > 1"
        :current-page="articlesStore.currentPage"
        :total-pages="articlesStore.totalPages"
        :on-page-changes="articlesStore.fetchArticles"
      />
    </LayoutContainer>
  </main>
</template>
