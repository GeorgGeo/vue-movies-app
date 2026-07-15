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
  // backgroundSize: 'cover',
  // backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));
</script>

<template>
  <div class="movie-item position-relative rounded overflow-hidden mb-3">
    <div class="movie-item__poster-wrap position-absolute top-0 start-0 end-0 bottom-0" :style="posterBg">


    </div>
    <!-- /.movie-item-poster-wrap -->
  </div>
</template>

<style scoped>
.movie-item {
  cursor: pointer;
  transition: all 0.4s ease-in;
  height: 300px;
}
</style>