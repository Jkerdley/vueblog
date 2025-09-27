<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['error', 'success', 'warning', 'info'].includes(value),
  },
})
const errorClass = 'text-red-400'
const successClass = 'text-green-400'
const warningClass = 'text-yellow-600'
const infoClass = 'text-sky-500 '

const getClass = () => {
  switch (props.type) {
    case 'error':
      return errorClass
    case 'success':
      return successClass
    case 'warning':
      return warningClass
    case 'info':
      return infoClass
    default:
      return ''
  }
}
</script>

<template>
  <div :class="getClass()" class="text-sm font-light">
    <slot> </slot>
  </div>
</template>
