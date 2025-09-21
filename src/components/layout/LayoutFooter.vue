<script setup>
import LayoutContainer from './LayoutContainer.vue'

const year = new Date().toLocaleString('ru-RU', {
  year: 'numeric',
})
</script>
<template>
  <footer class="bg-white">
    <LayoutContainer>
      <div class="flex items-center justify-between py-8">
        <div>
          <p>Блог разработчика</p>
          <p>my@mail.ru</p>
        </div>
        <div class="text-right">
          <p>
            Москва <time :datetime="year">{{ year }}</time>
          </p>
          <p>Погода: Солнечно, 20 С</p>
        </div>
      </div>
    </LayoutContainer>
  </footer>
</template>

<style scoped></style>
