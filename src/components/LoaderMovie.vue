<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const movieLoader = computed(() => store.getters['isShowLoader']); // без указания модуля ['loader/isShowLoader'] - так как модуль глобальный, не указано namespaced: true,
</script>

<template>
  <div v-if="movieLoader" class="loader-wrap d-flex justify-content-center align-items-center">
    <div class="loader-content d-flex flex-column align-items-center gap-2">
      <div class="spinner-grow text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>
      <!--  -->
      <strong role="status" class="text-danger loading-text">Loading<span class="dots"></span></strong>
    </div>
  </div>
</template>

<style scoped>
.loader-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.loading-text {
  display: inline-block;
  min-width: 80px;
}

.dots::after {
  content: '';
  animation: dots 1.5s steps(4, end) infinite;
}

@keyframes dots {
  0% {
    content: '';
  }

  25% {
    content: '.';
  }

  50% {
    content: '..';
  }

  75%,
  100% {
    content: '...';
  }
}
</style>