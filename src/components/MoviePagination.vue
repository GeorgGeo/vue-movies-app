<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'; //*!! useRoute() — это чтение, текущий маршрут. Возвращает реактивный объект текущего активного маршрута. Основные свойства: route.path, route.params, route.query и т.д.

// *!! useRouter() — это действие (инструменты для того, чтобы куда-то перейти). Возвращает сам экземпляр роутера. Это объект, который содержит методы для программной навигации. Основные методы: router.push(...) — переход на новую страницу (добавляет запись в историю браузера, работает кнопка "Назад"). router.replace(...) — переход на новую страницу (заменяет текущую запись в истории, кнопка "Назад" вернет на предыдущую, а не на эту). router.go(n) — переход на n шагов вперед/назад в истории (аналог window.history.go).

const route = useRoute();
const router = useRouter();
console.log('Route', route.query.page);
// console.log(router);

const store = useStore();
const windowWidth = ref(window.innerWidth);

const currentPage = computed(() => {
  return store.getters['movies/currentPageGetter'];
});

const totalPages = computed(() => {
  return store.getters['movies/totalPagesGetter']
});

// const changePage = (page) => {
//   store.commit('movies/SET_CURRENT_PAGE', page);

//   store.dispatch('movies/fetchMovies');
// }
const maxVisiblePages = computed(() => {
  if (windowWidth.value < 576) {
    return 3;
  }

  if (windowWidth.value < 768) {
    return 4;
  };

  return 5;
});

const visiblePages = computed(() => {
  const pages = [];

  // const maxVisiblePages = 5;

  let start = Math.max(1, currentPage.value - 2);

  let end = Math.min(totalPages.value, start + maxVisiblePages.value - 1);

  if (end - start < maxVisiblePages.value - 1) {
    start = Math.max(1, end - maxVisiblePages.value + 1);
  };

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  return pages;
});

const changePage = async (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return;
  }

  store.commit('movies/SET_CURRENT_PAGE', page);

  await router.push({
    query: {
      page,
    }
  })

  await store.dispatch('movies/fetchMovies');
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

watch(() => route.query.page, (newPage) => {
  console.log('Новая страница', newPage)
});

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
})
</script>

<template>
  <div class="movie-pagination d-flex justify-content-center pb-1 pb-md-3">
    <nav aria-label="Movie pagination">
      <ul class="pagination mb-0">
        <!-- First -->
        <li class="page-item d-none d-md-block" :class="{disabled: currentPage === 1}">
          <button class="page-link px-1" type="button" @click="changePage(1)" :disabled="currentPage === 1">First</button>
        </li>
        <!-- Previous -->
        <li class="page-item" :class="{ disabled: currentPage === 1}">
          <button class="page-link px-1" type="button" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
        </li>
        <!-- Left dots -->
        <li class="page-item disabled" v-if="visiblePages[0] > 1">
          <span class="page-link">...</span>
        </li>
        <!-- Pages -->
        <li class="page-item" v-for="page in visiblePages" :key="page" :class="{ active: currentPage === page }">
          <button class="page-link" type="button" @click="changePage(page)">{{ page }}</button>
        </li>
        <!-- Right dots -->
        <li class="page-item disabled" v-if="visiblePages[visiblePages.length - 1] < totalPages">
          <span class="page-link">...</span>
        </li>
        <!-- Next -->
        <li class="page-item">
          <button class="page-link px-1" type="button" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
        </li>
        <!-- Last -->
        <li class="page-item d-none d-md-block" :class="{disabled: currentPage === totalPages}">
          <button class="page-link px-1" type="button" @click="changePage(totalPages)" :disabled="currentPage === totalPages">Last</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.movie-pagination :deep(.page-link) {
  background-color: transparent;
  color: #fff;
}

.movie-pagination :deep(.page-link:hover:not(:disabled)) {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.movie-pagination :deep(.page-item.active .page-link) {
  background-color: #fff;
  color: #000;
}

.movie-pagination :deep(.page-link:disabled) {
  color: #6c757d;
  opacity: 0.4;
  cursor: not-allowed;
}

.movie-pagination :deep(.page-item.disabled .page-link) {
  color: #6c757d;
  opacity: 0.4;
}
</style>