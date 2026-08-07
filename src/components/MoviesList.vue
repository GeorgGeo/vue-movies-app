<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MoviesItem from './MoviesItem.vue';
import ConfirmModal from './ConfirmModal.vue';
import MovieInfoModal from './MovieInfoModal.vue';

const store = useStore();

const props = defineProps({
  moviesListProps: {
    type: Object,
    default: () => ({}),
    required: true,
  }
});

const showModal = ref(false);
const showModalInfo = ref(false);
const selectedMovie = ref(null); // создаем реактивную переменную для хранения выбранного фильма, который будет удаляться


const emit = defineEmits(['changePoster']);

const isExist = computed(() => Boolean(Object.keys(props.moviesListProps).length)); // проверяем, есть ли фильмы в объекте

const title = computed(() => {
  return store.state.movies.isSearch ? `Search results for "${store.state.movies.searchQuery}"` : 'IMDB Top 250';
});

const onMouseOver = (poster) => {
  emit('changePoster', poster);
};

const onRemoveEvent = (movie) => {
  selectedMovie.value = movie;
  showModal.value = true;
};

// const showMovieInfo = () => {
//   // selectedMovie.value = store.state.movies.moviesList.find(movie => movie.imdbID === id);
//   showModalInfo.value = true;
// };

const onShowMovieInfo = (id) => {
  // store.dispatch('movies/fetchMovieDetails', imdbID);
  // store.commit('movies/setShowModal', true);
  console.log('Show movie info for ID:', id);

  selectedMovie.value = {
    Title: 'Test Movie'
  };

  showModalInfo.value = true;
};
const deleteMovie = () => {
  console.log(selectedMovie.value);
  store.dispatch('movies/removeMovie', selectedMovie.value.id);// вызываем action removeMovie из модуля movies, передавая id фильма

  store.dispatch('notificationStore/showToastNotification', {
    type: 'success',
    title: 'Movie removed',
    movie: selectedMovie.value.title,
    text: 'has been removed successfully from the list.',
  }); // вызываем action showNotification из модуля notificationStore, передавая сообщение

  showModal.value = false;
}
</script>

<template>
  <div>
    <div class="container movie-list">
      <h3 class="movie-list__title fs-1 mb-5 text-white">{{ title }}</h3>
      <!--  -->
      <div class="row">
        <template v-if="isExist">
          <div
            v-for="movie in moviesListProps"
            :key="movie.imdbID"
            class="col-6 col-md-4 col-lg-3 mb-4"
          >
            <MoviesItem :movie-item-props="movie" @emit-remove-event="onRemoveEvent" @mouseover="onMouseOver(movie.Poster)"
            @show-modal-info="onShowMovieInfo" />
          </div>
          <!--  -->
        </template>
        <!--  -->
        <template v-else>
          <div class="col-12">
            <p class="text-center fs-4">No movies found.</p>
          </div>
        </template>
        <ConfirmModal :movie="selectedMovie" :show="showModal" @confirm="deleteMovie" @cancel="showModal = false" />
        <!--  -->
        <MovieInfoModal :movie="selectedMovie" :show="showModalInfo" @close="showModalInfo = false" />
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </div>
</template>

<style scoped>

</style>