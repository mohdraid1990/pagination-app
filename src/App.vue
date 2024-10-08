<template>
  <div id="app">
    <router-view></router-view>
    <!-- Компонент для отображения маршрутов -->
  </div>
</template>

<script>
export default {
  name: "App", // Имя основного компонента приложения
};
</script>

<style lang="scss">
body {
  margin: 0; // Убираем отступы у body
  font-family: "Arial", sans-serif; // Задаем шрифт Arial
  background-color: #f0f0f0; // Устанавливаем светло-серый цвет фона
}
</style>
