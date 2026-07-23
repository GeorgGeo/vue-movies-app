<script setup>
// mapActions - это функция, которая позволяет связывать методы компонента с действиями Vuex. Она принимает объект, где ключи - это имена методов компонента, а значения - это имена действий Vuex. Это позволяет вызывать действия Vuex напрямую из методов компонента, без необходимости использовать this.$store.dispatch.
// import { mapActions } from 'vuex';
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import MoviesList from '@/components/MoviesList.vue';
import PosterBg from '@/components/PosterBg.vue';
import MoviePagination from '@/components/MoviePagination.vue';

const store = useStore(); // получили доступ к корневому хранилищу Vuex
const route = useRoute();

const moviesList = computed(() => store.getters['movies/moviesListGetter']); // получаем объект фильмов из геттера модуля movies

const posterBg = ref('');
const onChangePoster = (poster) => {
  console.log(poster);
  posterBg.value = poster;
}

// сделать fetchMovies асинхронной функцией и дождаться выполнения dispatch, если твой action асинхронный
const fetchMovies = async () => {
  // dispatch - это метод, который позволяет вызывать действия Vuex. Он принимает два аргумента: имя действия и объект с параметрами. В данном случае мы вызываем действие fetchMovies из модуля movies.
  await store.dispatch('movies/fetchMovies'); // вызываем действие fetchMovies из модуля movies
};

onMounted(async () => {
  const page = Number(route.query.page) || 1;

  console.log('1. Page from URL:', page);

  store.commit('movies/SET_CURRENT_PAGE', page);

  console.log(
    '2. Page in Vuex:',
    store.getters['movies/currentPageGetter']
  );

  await fetchMovies(); // вызываем функцию fetchMovies при монтировании компонента

  console.log(
    '3. Page after fetch:',
    store.getters['movies/currentPageGetter']
  );
  
});
</script>

<template>
  <div class="position-relative">
    <PosterBg :poster="posterBg" />
    <MoviesList :movies-list-props="moviesList" @change-poster="onChangePoster" />
    <MoviePagination />
  </div>
</template>

<style scoped></style>
