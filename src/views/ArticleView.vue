<script setup>
import ArticleComment from '@/components/ArticleComment.vue'
import ArticleDetails from '@/components/ArticleDetails.vue'
import ArticleDetailsForm from '@/components/ArticleDetailsForm.vue'
import ArticleForm from '@/components/ArticleForm.vue'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { useArticleStore } from '@/stores/article'
import { useUserStore } from '@/stores/user'
import { onBeforeMount, ref } from 'vue'
import NotFoundPage from './NotFoundPage.vue'

const articleStore = useArticleStore()
const userStore = useUserStore()
const notFound = ref(false)

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

onBeforeMount(async () => {
  try {
    await articleStore.fetchArticle(props.id)
  } catch (error) {
    notFound.value = true
    console.log('error HERE', error)
  }
})
</script>

<template>
  <NotFoundPage v-if="notFound" />
  <LayoutContainer v-else class="mt-4">
    <ArticleDetailsForm v-if="articleStore.isInEditMode" />
    <ArticleDetails v-else :date-options="dateOptions" />
    <section v-if="!articleStore.isInEditMode && userStore.isAuthorised">
      <h2 v-if="articleStore.article?.comments?.length > 0" class="mb-4 text-2xl font-bold">
        Комментарии
      </h2>
      <ArticleComment
        v-for="comment in articleStore.article.comments"
        :comment="comment"
        :key="comment.id"
        :date-options="dateOptions"
      />
      <ArticleForm v-show="userStore.isAuthorised" />
    </section>
  </LayoutContainer>
</template>
