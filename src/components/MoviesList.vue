<script setup>
import { computed } from 'vue';
import MoviesItem from './MoviesItem.vue';

const props = defineProps({
  moviesListProps: {
    type: Object,
    default: () => ({}),
    required: true,
  }
});

const isExist = computed(() => Boolean(Object.keys(props.moviesListProps).length)); // проверяем, есть ли фильмы в объекте
</script>

<template>
  <div>
    <div class="container movie-list">
      <h3 class="movie-list__title fs-1 mb-5">IMDB Top 250</h3>
      <!--  -->
      <div class="row">
        <template v-if="isExist">
          <div
            v-for="(movie, index) in moviesListProps"
            :key="index"
            class="col-6 col-md-4 col-lg-3 mb-4"
          >
            <MoviesItem :movie-item-props="movie" />
          </div>
        </template>
        <!--  -->
        <template v-else>
          <div class="col-12">
            <p class="text-center fs-4">No movies found.</p>
          </div>
        </template>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </div>
</template>

<style scoped>

</style>