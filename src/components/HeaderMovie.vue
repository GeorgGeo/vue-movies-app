<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

// const searchValue = ref('');
let timer = null;

const store = useStore();
const router = useRouter();
const route = useRoute();

const searchValue = ref(route.query.search || ''); // инициализируем searchValue значением из query-параметров URL, если оно есть, иначе пустой строкой
const searchMovies = async (query) => {
  store.commit('movies/SET_CURRENT_PAGE', 1); // при поиске сбрасываем текущую страницу на 1
  // await store.dispatch('movies/loadMovies'); // вызываем loadMovies, который проверяет, был ли поиск или нет, и вызывает соответствующий action

  await router.push({
    query: {
      page: 1,
      search: query,
    },
  }); // обновляем URL с поисковым запросом и текущей страницей

  await store.dispatch('movies/searchMovies', query);
}

watch(searchValue, async (newValue) => {
  clearTimeout(timer);

  // timer = setTimeout(() => {
  //   console.log(`searchValue changed from ${oldValue} to ${newValue}`)
  // }, 500);

  // Не искать пускую строку
  if (!newValue.trim()) {
    store.commit('movies/SET_CURRENT_PAGE', 1); // при поиске сбрасываем текущую страницу на 1
    // return;
    await router.push({
      query: {
        page: 1,
      },
    }); // обновляем URL с текущей страницей

    await store.dispatch('movies/fetchMovies'); // вызываем fetchMovies, который загружает все фильмы, так как поисковый запрос пустой
    // await store.dispatch('movies/fetchMovies');// Если строка поиска пустая, то загружаем все фильмы
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