<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

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

const visiblePages = computed(() => {
  const pages = [];

  const maxVisiblePages = 5;

  let start = Math.max(1, currentPage.value - 2);

  let end = Math.min(totalPages.value, start + maxVisiblePages - 1);

  if (end - start < maxVisiblePages - 1) {
    start = Math.max(1, end - maxVisiblePages + 1);
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

  await store.dispatch('movies/fetchMovies');
}
</script>

<template>
  <div>
    <nav aria-label="Movie pagination">
      <ul class="pagination mb-0">
        <!-- First -->
        <li class="page-item" :class="{disabled: currentPage === 1}">
          <button class="page-link" type="button" @click="changePage(1)" :disabled="currentPage === 1">First</button>
        </li>
        <!-- Previous -->
        <li class="page-item" :class="{ disabled: currentPage === 1}">
          <button class="page-link" type="button" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
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
          <button class="page-link" type="button" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
        </li>
        <!-- Last -->
        <li class="page-item" :class="{disabled: currentPage === totalPages}">
          <button class="page-link" type="button" @click="changePage(totalPages)" :disabled="currentPage === totalPages">Last</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>

</style>