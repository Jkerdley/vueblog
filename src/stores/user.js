import { ROLES } from '@/constants/roles'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'

const initialState = {
  id: '',
  login: '',
  roleId: null,
  registeredAt: '',
}

export const useUserStore = defineStore('user', () => {
  const user = ref({ ...initialState })

  const isAuthorised = computed(() => user.value.id !== '' && user.value.roleId !== null)

  const isAdmin = computed(() => user.value.id && user.value.roleId === ROLES.ADMIN)

  const isModerator = computed(() => user.value.id && user.value.roleId === ROLES.MODERATOR)

  const register = async (login, password) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Ошибка регистрации пользователя')
      }

      const data = await response.json()
      user.value = { ...data.data }
      return data
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  const login = async (login, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Ошибка авторизации пользователя')
      }

      const data = await response.json()
      user.value = { ...data.data }
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Ошибка выхода пользователя')
      }

      const data = await response.json()
      if (!data.error) {
        user.value = { ...initialState }
      }

      return data
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    user,
    register,
    login,
    isAuthorised,
    isAdmin,
    isModerator,
    logout,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
