import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'

const initialState = {
  id: '',
  login: '',
  roleId: null,
  registeredAt: '',
}

export const useUserStore = defineStore('user', () => {
  const user = ref(initialState)

  const isAuthorised = computed(() => user.value.id !== '' && user.value.roleId !== null)

  const register = async (login, password) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify({ login, password }),
      })
      if (response.ok) {
        const data = await response.json()
        return data
      } else {
        throw new Error('Ошибка регистрации пользователя')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (login, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify({ login, password }),
      })
      if (!response.ok) {
        throw new Error('Ошибка авторизации пользователя')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
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
        user.value = initialState
      }
    } catch (error) {
      console.log(error)
    }
  }
  return { user, register, login, isAuthorised, logout }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
