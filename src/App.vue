<script setup>
// mapActions - это функция, которая позволяет связывать методы компонента с действиями Vuex. Она принимает объект, где ключи - это имена методов компонента, а значения - это имена действий Vuex. Это позволяет вызывать действия Vuex напрямую из методов компонента, без необходимости использовать this.$store.dispatch.
// import { mapActions } from 'vuex';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore(); // получили доступ к корневому хранилищу Vuex

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
    <h1>You did it!</h1>
    <p>
      Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
      documentation
    </p>
    <button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>

<button type="button" class="btn btn-link">Link</button>
  </div>
</template>

<style scoped></style>
