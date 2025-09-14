<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendar, faComment } from '@fortawesome/free-solid-svg-icons'
import { useArticlesStore } from '@/stores/articles'
import { onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'
import { formatDate } from '@/utils/dateFormaters'

const articlesStore = useArticlesStore()
console.log('articlesStore', articlesStore.articles)

onBeforeMount(() => {
  articlesStore.fetchArticles()
})
</script>
<template>
  <section class="my-8">
    <h2 class="sr-only">Последние статьи</h2>
    <ul class="grid grid-cols-3 gap-8">
      <li v-for="article in articlesStore.articles" :key="article.id" class="flex">
        <article class="flex w-full">
          <RouterLink
            :to="`/post/${article.id}`"
            class="flex w-full flex-col rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-2xl"
          >
            <div class="mb-4">
              <img :src="article.imageUrl" :alt="article.title" class="h-48 w-full object-cover" />
            </div>
            <h3>{{ article.title }}</h3>
            <div class="mt-auto flex items-center justify-between">
              <p>
                <time :datetime="article.publishedAt">
                  <FontAwesomeIcon :icon="faCalendar" />
                  {{ formatDate(article.publishedAt) }}
                </time>
              </p>
              <p>
                <FontAwesomeIcon :icon="faComment" />
                {{ article.comments.length }}
              </p>
            </div>
          </RouterLink>
        </article>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
