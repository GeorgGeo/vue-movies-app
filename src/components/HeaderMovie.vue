<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const searchValue = ref('');
let timer = null;

const store = useStore();

const searchMovies = async (query) => {
  await store.dispatch('movies/searchMovies', query);
}

watch(searchValue, (newValue) => {
  clearTimeout(timer);

  // timer = setTimeout(() => {
  //   console.log(`searchValue changed from ${oldValue} to ${newValue}`)
  // }, 500);

  // Не искать пускую строку
  if (!newValue.trim()) {
    return;
  }

  timer = setTimeout(() => {
    searchMovies(newValue);
  }, 500);
})
</script>

<template>
  <div>
    <nav class="navbar bg-body-tertiary mb-3" data-bs-theme="dark">
      <div class="container-fluid">
        <div class="navbar-brand" href="#">MovieDB</div>
        <form class="d-flex" role="search">
          <input v-model="searchValue" class="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar-brand {
  color: #fff;
  text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.7);
}
</style>