<template>
  <div class="pagination-container">
    <div class="records">
      <!-- Отображение записей на странице -->
      <div v-for="record in paginatedData" :key="record.id" class="record">
        {{ record.name }}
      </div>
    </div>

    <div class="pagination-links">
      <!-- Ссылка на первую страницу с классом first -->
      <a
        href="#"
        @click.prevent="changePage(1)"
        v-if="currentPage !== 1"
        class="first"
      >
        First
      </a>

      <!-- Ссылка на предыдущую страницу -->
      <a
        href="#"
        @click.prevent="changePage(currentPage - 1)"
        v-if="currentPage > 1"
      >
        Previous
      </a>

      <!-- Отображение ссылок для перехода по страницам -->
      <a
        href="#"
        v-for="page in pageLinks"
        :key="page"
        @click.prevent="changePage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </a>

      <!-- Ссылка на следующую страницу -->
      <a
        href="#"
        @click.prevent="changePage(currentPage + 1)"
        v-if="currentPage < totalPages"
      >
        Next
      </a>

      <!-- Ссылка на последнюю страницу с классом last -->
      <a
        href="#"
        @click.prevent="changePage(totalPages)"
        v-if="currentPage !== totalPages"
        class="last"
      >
        Last
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Количество записей на странице
    recordsPerPage: {
      type: Number,
      default: 10, // По умолчанию 10 записей на странице
    },
    // Количество видимых ссылок для навигации по страницам
    visibleLinks: {
      type: Number,
      default: 3, // По умолчанию 3 видимые ссылки
    },
  },
  data() {
    return {
      data: [], // Данные для отображения записей
      currentPage: parseInt(this.$route.params.page) || 1, // Текущая страница, полученная из URL
    };
  },
  computed: {
    // Вычисление записей, которые нужно показать на текущей странице
    paginatedData() {
      const start = (this.currentPage - 1) * this.recordsPerPage;
      return this.data.slice(start, start + this.recordsPerPage);
    },
    // Общее количество страниц
    totalPages() {
      return Math.ceil(this.data.length / this.recordsPerPage);
    },
    // Вычисление ссылок на страницы, которые нужно показать
    pageLinks() {
      let startPage = Math.max(
        1,
        this.currentPage - Math.floor(this.visibleLinks / 2)
      );
      let endPage = Math.min(
        this.totalPages,
        startPage + this.visibleLinks - 1
      );

      if (endPage - startPage < this.visibleLinks - 1) {
        startPage = Math.max(1, endPage - this.visibleLinks + 1);
      }

      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    },
  },
  methods: {
    // Метод для смены страницы и обновления URL
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$router.push({ name: "pagination", params: { page } }); // Обновление URL
      }
    },
    // Загрузка данных (в данном случае 100 записей)
    loadData() {
      this.data = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Record ${i + 1}`,
      }));
    },
  },
  watch: {
    // Отслеживание изменения параметра страницы в URL
    "$route.params.page"(newPage) {
      this.currentPage = parseInt(newPage) || 1;
    },
  },
  created() {
    // При создании компонента загружаются данные
    this.loadData();
  },
};
</script>

<style lang="scss">
.pagination-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;

  .records {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .record {
    background-color: #ffffff;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  }

  .pagination-links {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    flex-wrap: wrap;
    gap: 10px;

    a {
      margin: 0 8px;
      padding: 10px 15px;
      font-size: 16px;
      text-decoration: none;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
      color: #333;
      background-color: #f8f8f8;
      transition: background-color 0.3s ease, color 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        background-color: #007bff;
        color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      &.active {
        background-color: #007bff;
        color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      // Специальные стили для ссылок "First" и "Last"
      &.first,
      &.last {
        background-color: #28a745; // Цвет фона для ссылок "First" и "Last"
        color: #ffffff; // Цвет текста для ссылок "First" и "Last"
        border: 1px solid #28a745;

        &:hover {
          background-color: #218838; // Цвет фона при наведении на ссылки "First" и "Last"
          color: #ffffff;
          border: 1px solid #218838;
        }
      }
    }
  }
}
</style>
