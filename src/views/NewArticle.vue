<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseInputError from '@/components/base/BaseInputError.vue'
import BaseLabel from '@/components/base/BaseLabel.vue'
import BaseMessageBox from '@/components/base/BaseMessageBox.vue'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { useArticleStore } from '@/stores/article'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

const articleStore = useArticleStore()
const errorMessage = ref('')

const schema = yup.object({
  imageUrl: yup.string().required('URL обязателен'),
  title: yup.string().required('Заголовок обязателен'),
  content: yup.string().required('Контент обязателен'),
})

const router = useRouter()

const handleAddArticle = async (formData) => {
  errorMessage.value = ''
  const response = await articleStore.addArticle(formData)
  console.log('response', response)

  if (response.error) {
    errorMessage.value = response.error
    return
  }
  router.push(`/post/${response.id}`)
}
</script>
<template>
  <LayoutContainer class="py-8">
    <h1 class="my-8 text-center text-2xl font-bold">Новая статья</h1>
    <Form
      @submit="handleAddArticle"
      :validation-schema="schema"
      class="mx-auto w-full rounded-2xl bg-white p-6 shadow-2xl/10"
    >
      <div class="mb-4">
        <BaseLabel for="imageUrl">URL изображения</BaseLabel>
        <BaseInput name="imageUrl" id="imageUrl" type="url" />
        <BaseInputError name="imageUrl">Ошибка</BaseInputError>
      </div>
      <div class="mb-4">
        <BaseLabel for="title">Заголовок</BaseLabel>
        <BaseInput name="title" id="title" type="text" />
        <BaseInputError name="title">Ошибка</BaseInputError>
      </div>
      <div class="mb-4">
        <BaseLabel for="content">Контент поста</BaseLabel>
        <BaseInput as="textarea" rows="10" name="content" id="content" type="textarea" />
        <BaseInputError name="content">Ошибка</BaseInputError>
      </div>
      <BaseButton class="w-full" type="submit"> Сохранить </BaseButton>
      <BaseMessageBox v-if="errorMessage" type="info">{{ errorMessage }}</BaseMessageBox>
    </Form>
  </LayoutContainer>
</template>

<style scoped></style>
