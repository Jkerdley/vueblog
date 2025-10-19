import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Ошибка получения списка пользователей')
      }
      const data = await response.json()
      // Сохраняем исходную роль для отслеживания изменений
      users.value = data.data.map((user) => ({
        ...user,
        _originalRoleId: user.roleId, // Для отслеживания изменений
      }))
    } catch (error) {
      console.error('Fetch users error:', error)
      throw error // Пробрасываем ошибку выше
    }
  }

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления пользователя')
      }

      // Удаляем пользователя из локального состояния
      users.value = users.value.filter((user) => user.id !== userId)
    } catch (error) {
      console.error('Delete user error:', error)
      throw error
    }
  }

  const changeUserRole = async (userId, userRole) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roleId: userRole }),
      })

      if (!response.ok) {
        throw new Error('Ошибка смены роли пользователя')
      }

      const data = await response.json()

      // Обновляем пользователя в локальном состоянии
      const userIndex = users.value.findIndex((user) => user.id === userId)
      if (userIndex !== -1) {
        users.value[userIndex] = {
          ...users.value[userIndex],
          ...data.data,
          _originalRoleId: data.data.roleId, // Обновляем исходную роль
        }
      }
    } catch (error) {
      console.error('Change role error:', error)
      throw error
    }
  }

  return {
    users,
    fetchUsers,
    deleteUser,
    changeUserRole,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
