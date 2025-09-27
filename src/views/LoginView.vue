<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseInputError from '@/components/base/BaseInputError.vue'
import BaseLabel from '@/components/base/BaseLabel.vue'
import BaseMessageBox from '@/components/base/BaseMessageBox.vue'
import { useUserStore } from '@/stores/user'
import { ErrorMessage, Form } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import * as yup from 'yup'

const userStore = useUserStore()
const errorMesage = ref('')
const router = useRouter()

const schema = yup.object({
  login: yup.string().required('Логин обязателен').min(3, 'Логин не может быть менее 3х символов'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(3, 'Пароль не может быть менее 3х символов')
    .max(40, 'Пароль не должен быть длиннее 40 символов'),
})

const handleSubmit = async (formData) => {
  errorMesage.value = ''

  try {
    const data = await userStore.login(formData.login, formData.password)
    if (data?.error) {
      throw new Error(data?.error)
    }

    userStore.user = data.user
    router.push('/')
  } catch (error) {
    errorMesage.value = error
  }
}
</script>
<template>
  <h1 class="my-8 text-center text-2xl font-bold">Логин</h1>
  <RouterLink to="/register">Регистрация</RouterLink>
  <Form
    @submit="handleSubmit"
    :validation-schema="schema"
    class="mx-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl/10"
  >
    <div class="mb-4">
      <div class="mb-4">
        <BaseLabel for="login">Логин</BaseLabel>
        <BaseInput name="login" id="login" type="text" />
        <BaseInputError name="login">Ошибка</BaseInputError>
      </div>
      <div class="mb-4">
        <BaseLabel for="login">Пароль</BaseLabel>
        <BaseInput name="password" id="password" type="password" />
        <BaseInputError name="password">Ошибка</BaseInputError>
      </div>
    </div>
    <BaseButton class="w-full" type="submit"> Войти </BaseButton>
    <RouterLink to="/register">Нет аккаунта?</RouterLink>
    <BaseMessageBox type="info">{{ ErrorMessage }}</BaseMessageBox>
  </Form>
</template>

<style lang="scss" scoped></style>
