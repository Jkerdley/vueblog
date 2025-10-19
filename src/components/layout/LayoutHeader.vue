<script setup>
import LayoutContainer from './LayoutContainer.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBackward,
  faCode,
  faUsers,
  faFile,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const handleLogout = async () => {
  const response = await userStore.logout()

  if (!response.error && route.meta.requiresAuth) {
    router.push('/')
  }
}
</script>
<template>
  <header class="fixed top-0 right-0 left-0 z-10 bg-white">
    <LayoutContainer>
      <section class="flex items-center justify-between py-4">
        <div>
          <RouterLink to="/" class="hover:text-sky-400" aria-label="Логотип"
            ><FontAwesomeIcon :icon="faCode" class="mr-2" />Блог веб-разработчика</RouterLink
          >
        </div>
        <div>
          <p>Веб-технологии</p>
          <p>Написание кода</p>
          <p>Разбор ошибок</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="mb-2">
            <RouterLink
              v-if="!userStore.isAuthorised"
              to="/login"
              class="rounded-md bg-sky-400 px-5 py-1.5 text-white hover:bg-sky-600"
              aria-label="Страница входа"
              >Войти
            </RouterLink>
            <div class="text-right" v-else>
              <span>{{ userStore.user.login }}</span>
              &nbsp;|&nbsp;
              <button @click="handleLogout" class="cursor-pointer hover:text-sky-300">
                <RouterLink to="/logout" aria-label="Выход"
                  ><FontAwesomeIcon :icon="faArrowRightFromBracket" class="hover:text-sky-300"
                /></RouterLink>
              </button>
            </div>
          </div>
          <p>
            <a href="#" @click="$router.go(-1)" aria-label="Назад"
              ><FontAwesomeIcon :icon="faBackward" class="hover:text-sky-300"
            /></a>
            &nbsp;
            <RouterLink
              v-if="userStore.isAuthorised && userStore.isAdmin"
              to="/post"
              aria-label="Новая статья"
              ><FontAwesomeIcon :icon="faFile" class="hover:text-sky-300"
            /></RouterLink>
            &nbsp;
            <RouterLink
              v-if="userStore.isAuthorised && userStore.isAdmin"
              to="/users"
              aria-label="Пользователи"
              ><FontAwesomeIcon :icon="faUsers" class="hover:text-sky-300"
            /></RouterLink>
          </p>
        </div>
      </section>
    </LayoutContainer>
  </header>
</template>

<style scoped></style>
