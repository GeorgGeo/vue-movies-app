<script setup>
import { computed, ref } from 'vue';
import MoviesItem from './MoviesItem.vue';
import ConfirmModal from './ConfirmModal.vue';

const props = defineProps({
  moviesListProps: {
    type: Object,
    default: () => ({}),
    required: true,
  }
});

const showModal = ref(false);
const selectedMovie = ref(null);


const emit = defineEmits(['changePoster']);

const isExist = computed(() => Boolean(Object.keys(props.moviesListProps).length)); // проверяем, есть ли фильмы в объекте

const onMouseOver = (poster) => {
  emit('changePoster', poster);
};

const onRemoveEvent = (movie) => {
  selectedMovie.value = movie;
  showModal.value = true;
};

const deleteMovie = () => {
  console.log(selectedMovie.value);

  showModal.value = false;
}
</script>

<template>
  <div>
    <div class="container movie-list">
      <h3 class="movie-list__title fs-1 mb-5 text-white">IMDB Top 250</h3>
      <!--  -->
      <div class="row">
        <template v-if="isExist">
          <div
            v-for="movie in moviesListProps"
            :key="movie.imdbID"
            class="col-6 col-md-4 col-lg-3 mb-4"
          >
            <MoviesItem :movie-item-props="movie" @emit-remove-event="onRemoveEvent" @mouseover="onMouseOver(movie.Poster)" />
          </div>
        </template>
        <!--  -->
        <template v-else>
          <div class="col-12">
            <p class="text-center fs-4">No movies found.</p>
          </div>
        </template>
        <ConfirmModal :movie="selectedMovie" :show="showModal" @confirm="deleteMovie" @cancel="showModal = false" />
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </div>
</template>

<style scoped>

</style>