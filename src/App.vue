<script setup>
// mapActions - это функция, которая позволяет связывать методы компонента с действиями Vuex. Она принимает объект, где ключи - это имена методов компонента, а значения - это имена действий Vuex. Это позволяет вызывать действия Vuex напрямую из методов компонента, без необходимости использовать this.$store.dispatch.
// import { mapActions } from 'vuex';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import MoviesList from './components/MoviesList.vue';

const store = useStore(); // получили доступ к корневому хранилищу Vuex

const moviesList = computed(() => store.getters['movies/moviesListGetter']); // получаем объект фильмов из геттера модуля movies

// сделать fetchMovies асинхронной функцией и дождаться выполнения dispatch, если твой action асинхронный
const fetchMovies = async () => {
  // dispatch - это метод, который позволяет вызывать действия Vuex. Он принимает два аргумента: имя действия и объект с параметрами. В данном случае мы вызываем действие fetchMovies из модуля movies.
  await store.dispatch('movies/fetchMovies'); // вызываем действие fetchMovies из модуля movies
};

onMounted(() => {
  fetchMovies(); // вызываем функцию fetchMovies при монтировании компонента
});
</script>

<template>
  <div>
    <MoviesList :movies-list-props="moviesList" />
  </div>
</template>

<style scoped></style>
