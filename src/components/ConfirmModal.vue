<script setup>
const props = defineProps({
  movie: Object,
  show: Boolean,
});

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div>
    <div v-if="props.show" class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Modal</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="emit('cancel')"></button>
          </div>
          <div class="modal-body">
            <p>Do you really want to delete the movie <strong>{{ props.movie?.title }}</strong>?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emit('cancel')">Cancel</button>
            <button type="button" class="btn btn-primary" @click="emit('confirm')">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>