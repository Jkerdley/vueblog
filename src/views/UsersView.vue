<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { useUsersStore } from '@/stores/users'
import { useRolesStore } from '@/stores/roles'
import { formatDate } from '@/utils/dateFormaters'
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref, reactive, onMounted } from 'vue'

const usersStore = useUsersStore()
const usersRolesStore = useRolesStore()
const users = computed(() => usersStore.users)
const userMessages = reactive({
  messages: {},
  types: {},
})
const error = ref('')

onMounted(async () => {
  try {
    await Promise.all([usersStore.fetchUsers(), usersRolesStore.fetchUsersRoles()])
  } catch (err) {
    error.value = err.message || 'Ошибка загрузки данных'
  }
})

const handleUserDelete = async (id) => {
  try {
    await usersStore.deleteUser(id)
  } catch (err) {
    error.value = err.message || 'Ошибка удаления пользователя'
  }
}

const handleRoleUpdate = async (user) => {
  const originalRoleId = user.roleId

  try {
    await usersStore.changeUserRole(user.id, user.roleId)

    userMessages.messages[user.id] = 'Роль обновлена'
    userMessages.types[user.id] = 'success'

    setTimeout(() => {
      userMessages.messages[user.id] = ''
      userMessages.types[user.id] = ''
    }, 3000)
  } catch (err) {
    user.roleId = originalRoleId
    userMessages.messages[user.id] = err.message || 'Ошибка обновления роли'
    userMessages.types[user.id] = 'error'

    setTimeout(() => {
      userMessages.messages[user.id] = ''
      userMessages.types[user.id] = ''
    }, 3000)
  }
}
</script>
<template>
  <LayoutContainer>
    <h1 class="my-4 text-center text-3xl">Пользователи</h1>
    <div class="mb-10 rounded-md bg-white p-8 shadow-md">
      <div v-if="error" class="mb-4 rounded-md bg-red-100 p-4 text-red-700">
        {{ error }}
      </div>

      <table v-if="users.length > 0" class="w-full min-w-full table-fixed">
        <thead>
          <tr class="border-b">
            <th class="p-2 text-left">Логин</th>
            <th class="p-2 text-left">Дата регистрации</th>
            <th class="p-2 text-left">Роль</th>
            <th class="p-2 text-right">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
            <td class="p-2">{{ user.login }}</td>
            <td class="p-2">{{ formatDate(user.registeredAt) }}</td>
            <td class="p-2">
              <form @submit.prevent="handleRoleUpdate(user)" class="flex items-center gap-2">
                <select
                  v-model="user.roleId"
                  class="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option
                    v-for="role in usersRolesStore.roles"
                    :value="role.id"
                    :key="`${user.id}-${role.id}`"
                  >
                    {{ role.name }}
                  </option>
                </select>
                <button
                  type="submit"
                  class="flex cursor-pointer items-center justify-center rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                  :disabled="user.roleId === user._originalRoleId"
                >
                  <FontAwesomeIcon :icon="faFloppyDisk" />
                </button>

                <span
                  v-if="userMessages.messages[user.id]"
                  :class="{
                    'text-green-600': userMessages.types[user.id] === 'success',
                    'text-red-600': userMessages.types[user.id] === 'error',
                  }"
                  class="text-sm font-medium"
                >
                  {{ userMessages.messages[user.id] }}
                </span>
              </form>
            </td>
            <td class="flex justify-end p-2">
              <button
                @click="handleUserDelete(user.id)"
                class="flex cursor-pointer items-center gap-1 rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
              >
                <FontAwesomeIcon :icon="faTrash" />
                <span>Удалить</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="text-center text-gray-500">Пользователи не найдены</div>
    </div>
  </LayoutContainer>
</template>

<style scoped></style>
