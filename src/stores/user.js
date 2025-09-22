import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    login: '',
    role: null,
  })

  const register = async (login, password) => {
    try {
      const response = await fetch('/register', {
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
  return { user, register }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
