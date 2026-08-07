<script setup>

const props = defineProps({
  movie: Object,
  show: Boolean,
});

const emit = defineEmits(['close']); // определяем событие close, которое будет эмитироваться при закрытии модального окна

</script>

<template>
  <div>
    <div v-if="props.show">
      <!-- Затемнение -->
      <div class="modal-backdrop fade show"></div>
      <!--  -->
      <div class="modal d-block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" aria-label="Close" @click="emit('close')"></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
              <p>Movie Title: {{ props.movie?.Title }}</p>
              <span>{{ props.movie?.Title }}</span>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="emit('close')">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>