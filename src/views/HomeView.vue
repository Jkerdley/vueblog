<script setup>
import ArticlesList from '@/components/ArticlesList.vue'
import LayoutContainer from '@/components/LayoutContainer.vue'
import SearchBase from '@/components/SearchBase.vue'

import { useArticlesStore } from '@/stores/articles'

const articlesStore = useArticlesStore()
</script>

<template>
  <main>
    <LayoutContainer>
      <SearchBase :on-search="articlesStore.fetchArticles" />
      <ArticlesList />
    </LayoutContainer>
  </main>
</template>
