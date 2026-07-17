<script setup>
import { computed } from 'vue';

const props = defineProps({
  movieItemProps: {
    type: Object,
    required: true,
  }
});
console.log("Movie item props:", props.movieItemProps);

const posterBg = computed(() => ({
  backgroundImage: props.movieItemProps.Poster ? `url(${props.movieItemProps.Poster})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));
</script>

<template>
  <div class="movie-item position-relative rounded overflow-hidden mb-3">
    <div class="movie-item__poster-wrap position-absolute z-n1 top-0 start-0 end-0 bottom-0" :style="posterBg"></div>
    <!-- /.movie-item-poster-wrap -->
    <div class="movie-info__wrap w-100 p-2 p-md-3 d-flex flex-column justify-content-between h-100">
      <div class="movie-item__info">
        <h3 class="movie-item__title fs-5 fs-md-4 text-white text-shadow-3d">{{ props.movieItemProps.Title }}</h3>
        <p class="movie-item__year fs-6 fs-md-4 text-white">{{ props.movieItemProps.Year }}</p>
      </div>
      <!-- /.movie-item-info -->
      <div class="movie-item__controls row g-0">
        <div class="col-6 pe-2">
          <button class="movie-item__button movie-item__button--edit btn btn-primary w-100">Edit</button>
        </div>
        <div class="col-6 ps-2">
          <button class="movie-item__button movie-item__button--remove btn btn-danger w-100">Remove</button>
        </div>
      </div>
      <!-- /.movie-item-controls -->
    </div>
    <!-- /.movie-info__wrap -->
  </div>
</template>

<style scoped>
.movie-item {
  cursor: pointer;
  transition: all 0.4s ease-in;
  height: 400px;
}
.movie-item:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.7);
}
.movie-info__wrap {
  opacity: 0;
  transition: all 0.3s ease;
}
.movie-item:hover .movie-info__wrap {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
}
.text-shadow-3d {
  text-shadow: 2px 2px 1px rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .movie-item {
    height: 300px;
  }
}
@media (max-width: 576px) {
  .movie-item {
    height: 250px;
  }
}
</style>