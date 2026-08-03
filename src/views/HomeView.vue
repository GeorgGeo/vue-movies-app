<script setup>
// mapActions - это функция, которая позволяет связывать методы компонента с действиями Vuex. Она принимает объект, где ключи - это имена методов компонента, а значения - это имена действий Vuex. Это позволяет вызывать действия Vuex напрямую из методов компонента, без необходимости использовать this.$store.dispatch.
// import { mapActions } from 'vuex';
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import MoviesList from '@/components/MoviesList.vue';
import PosterBg from '@/components/PosterBg.vue';
import MoviePagination from '@/components/MoviePagination.vue';
import LoaderMovie from '@/components/LoaderMovie.vue';
import HeaderMovie from '@/components/HeaderMovie.vue';

const store = useStore(); // получили доступ к корневому хранилищу Vuex
const route = useRoute();
// const page = Number(route.query.page) || 1; // получаем текущую страницу из query-параметров URL, если она есть, иначе устанавливаем 1
// const search = route.query.search || ''; // получаем поисковый запрос из query-параметров URL, если он есть, иначе устанавливаем пустую строку

const moviesList = computed(() => store.getters['movies/moviesListGetter']); // получаем объект фильмов из геттера модуля movies

const posterBg = ref('');
const onChangePoster = (poster) => {
  console.log(poster);
  posterBg.value = poster;
}

// сделать fetchMovies асинхронной функцией и дождаться выполнения dispatch, если твой action асинхронный

// const fetchMovies = async () => {
//   // dispatch - это метод, который позволяет вызывать действия Vuex. Он принимает два аргумента: имя действия и объект с параметрами. В данном случае мы вызываем действие fetchMovies из модуля movies.
//   await store.dispatch('movies/fetchMovies'); // вызываем действие fetchMovies из модуля movies
// };

const loadMovies = async () => {
  const page = Number(route.query.page) || 1; // получаем текущую страницу из query-параметров URL, если она есть, иначе устанавливаем 1
  const search = route.query.search || ''; // получаем поисковый запрос из query-параметров URL, если он есть, иначе устанавливаем пустую строку

  store.commit('movies/SET_CURRENT_PAGE', page); // устанавливаем текущую страницу в хранилище Vuex

  if (search) {
    await store.dispatch('movies/searchMovies', search); // если есть поисковый запрос, вызываем действие searchMovies из модуля movies
  } else {
    await store.dispatch('movies/fetchMovies'); // иначе вызываем действие fetchMovies из модуля movies
  }
};

// onMounted(async () => {
//   const page = Number(route.query.page) || 1;

//   console.log('1. Page from URL:', page);

//   store.commit('movies/SET_CURRENT_PAGE', page);

//   console.log(
//     '2. Page in Vuex:',
//     store.getters['movies/currentPageGetter']
//   );

//   await fetchMovies(); // вызываем функцию fetchMovies при монтировании компонента

//   console.log(
//     '3. Page after fetch:',
//     store.getters['movies/currentPageGetter']
//   );

// });
onMounted(async () => {
  // store.commit('movies/SET_CURRENT_PAGE', page); // устанавливаем текущую страницу в хранилище Vuex при монтировании компонента
  // console.log('Page from URL:', page);
  // console.log('Page in Vuex:', store.getters['movies/currentPageGetter']);

  await loadMovies(); // вызываем функцию loadMovies при монтировании компонента
})
</script>

<template>
  <div class="position-relative">
    <LoaderMovie />
    <PosterBg :poster="posterBg" />
    <HeaderMovie />
    <MoviesList :movies-list-props="moviesList" @change-poster="onChangePoster" />
    <MoviePagination />
  </div>
</template>

<style scoped></style>
