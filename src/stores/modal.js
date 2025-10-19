import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const message = ref('Вы уверены?')
  const isVisible = ref(false)
  const onConfirmCallback = ref(null)

  const openModal = (newMessage, onConfirm) => {
    message.value = newMessage
    isVisible.value = true
    onConfirmCallback.value = onConfirm
  }
  const closeModal = () => {
    isVisible.value = false
    onConfirmCallback.value = null
  }

  const confirm = () => {
    if (onConfirmCallback.value) {
      onConfirmCallback.value()
    }
    closeModal()
  }

  return { message, isVisible, openModal, closeModal, confirm }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}
