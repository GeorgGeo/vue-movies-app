<script setup>
import { computed } from 'vue';

const props = defineProps({
  poster: {
    type: String,
    default: '',
  }
});

const posterBg = computed(() => ({
  backgroundImage: props.poster ? `url(${props.poster})` : 'linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));
</script>

<template>
  <div class="poster-page-bg position-absolute top-0 start-0 end-0 bottom-0 z-n1" :style="posterBg"></div>
</template>

<style scoped>
.poster-page-bg {
  background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
}
.poster-page-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
}
</style>