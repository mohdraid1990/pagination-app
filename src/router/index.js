// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import PaginationComponent from "../components/PaginationComponent.vue";

const routes = [
  {
    path: "/page/:page", // Маршрут с параметром страницы
    name: "pagination", // Имя маршрута
    component: PaginationComponent, // Компонент, который будет загружен для этого маршрута
  },
  {
    path: "/:pathMatch(.*)*", // Общий путь для всех несуществующих маршрутов
    redirect: "/page/1", // Перенаправление на страницу 1, если путь не существует
  },
];

// Создаем объект Vue Router
const router = createRouter({
  history: createWebHistory(), // Используем историю браузера для маршрутизации
  routes, // Устанавливаем маршруты
});

export default router; // Экспортируем объект маршрутизатора
