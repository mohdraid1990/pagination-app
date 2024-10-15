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
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  props: {
    recordsPerPage: {
      type: Number,
      default: 10,
    },
    visibleLinks: {
      type: Number,
      default: 3,
    },
  },
  setup(props) {
    const data = ref([]);
    const route = useRoute();
    const router = useRouter();
    const currentPage = ref(parseInt(route.params.page) || 1);

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * props.recordsPerPage;
      return data.value.slice(start, start + props.recordsPerPage);
    });

    const totalPages = computed(() => {
      return Math.ceil(data.value.length / props.recordsPerPage);
    });

    const pageLinks = computed(() => {
      let startPage = Math.max(
        1,
        currentPage.value - Math.floor(props.visibleLinks / 2)
      );
      let endPage = Math.min(
        totalPages.value,
        startPage + props.visibleLinks - 1
      );

      if (endPage - startPage < props.visibleLinks - 1) {
        startPage = Math.max(1, endPage - props.visibleLinks + 1);
      }

      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    });

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        router.push({ name: "pagination", params: { page } });
      }
    };

    const loadData = () => {
      data.value = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Record ${i + 1}`,
      }));
    };

    watch(
      () => route.params.page,
      (newPage) => {
        currentPage.value = parseInt(newPage) || 1;
      }
    );

    onMounted(() => {
      loadData();
    });

    return {
      data,
      currentPage,
      paginatedData,
      totalPages,
      pageLinks,
      changePage,
      loadData,
    };
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

      &.first,
      &.last {
        background-color: #28a745;
        color: #ffffff;
        border: 1px solid #28a745;

        &:hover {
          background-color: #218838;
          color: #ffffff;
          border: 1px solid #218838;
        }
      }
    }
  }
}
</style>
