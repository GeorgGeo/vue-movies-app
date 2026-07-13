<script setup>
import { defineProps } from 'vue';
import { computed } from 'vue';

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
      <div class="row" v-if="isExist">
        <template>
          <div
            v-for="(movie, index) in moviesListProps"
            :key="index"
            class="col-6 col-md-4 col-lg-3 mb-4"
          >
            <div class="card h-100">
              <img
                :src="movie.image"
                :alt="movie.title"
                class="card-img-top"
              />
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text">{{ movie.year }}</p>
              </div>
            </div>
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