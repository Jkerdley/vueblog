<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseInputError from '@/components/base/BaseInputError.vue'
import BaseLabel from '@/components/base/BaseLabel.vue'
import BaseMessageBox from '@/components/base/BaseMessageBox.vue'
</script>
<template>
  <h1 class="my-8 text-center text-2xl font-bold">Регистрация</h1>
  <RouterLink to="/login">В логин</RouterLink>
  <form action="" class="mx-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl/10">
    <div class="mb-4">
      <div class="mb-4">
        <BaseLabel for="login">Логин</BaseLabel>
        <BaseInput name="login" id="login" type="text" required />
        <BaseInputError>Ошибка</BaseInputError>
      </div>
      <div class="mb-4">
        <BaseLabel for="login">Пароль</BaseLabel>
        <BaseInput name="password" id="password" type="text" />
        <BaseInputError>Ошибка</BaseInputError>
      </div>
      <div class="mb-4">
        <BaseLabel for="login">Повторите пароль</BaseLabel>
        <BaseInput name="confirmPassword" id="confirmPassword" type="text" />
        <BaseInputError>Ошибка</BaseInputError>
      </div>
    </div>
    <BaseButton class="w-full" type="submit"> Зарегистрироваться </BaseButton>
    <BaseMessageBox type="info">Ошибка: неверные данные</BaseMessageBox>
  </form>
</template>

<style lang="scss" scoped></style>
