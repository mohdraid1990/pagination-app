import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Импортируем Vue Router

const app = createApp(App);

app.use(router); // Используем Router с приложением
app.mount("#app"); // Монтируем приложение в элемент с id "app"
