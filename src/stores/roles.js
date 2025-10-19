import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useRolesStore = defineStore('roles', () => {
  const roles = ref([])

  const fetchUsersRoles = async () => {
    try {
      const response = await fetch('/api/users/roles')
      if (!response.ok) {
        throw new Error('Ошибка получения списка ролей пользователей')
      }
      const data = await response.json()
      roles.value = data.data
    } catch (error) {
      console.error('Fetch roles error:', error)
      throw error
    }
  }

  return {
    fetchUsersRoles,
    roles,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRolesStore, import.meta.hot))
}
