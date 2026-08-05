<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Toast } from 'bootstrap';
import { useStore } from 'vuex';

const store = useStore(); // получаем доступ к хранилищу Vuex

const toastRef = ref(null);// создаем ссылку на элемент тоста
// const message = ref(''); // создаем реактивную переменную для хранения сообщения
let toastInstance = null; // создаем переменную для хранения экземпляра тоста из bootstrap

const message = computed(() => store.getters['notificationStore/messagePoolGetter']); // получаем сообщение из геттера модуля notificationStore

// Когда компонент смонтируется, создаем экземпляр тоста из bootstrap и передаем ему ссылку на элемент тоста
// После монтирования Vue помещает DOM-элемент в toastRef.value.
// Передаем этот DOM-элемент конструктору Bootstrap Toast,
// чтобы Bootstrap мог управлять его показом и скрытием.
onMounted(() => {
  toastInstance = new Toast(toastRef.value, {
    animation: true,
    autohide: true,
    delay: 3000,
  });
});

watch(() => message.value, (newMessage) => {

  if (!newMessage) {
    return;
  }

  // Если сообщение изменилось, показываем тост с новым сообщением
  toastInstance.show();
})
</script>

<template>
  <div>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        ref="toastRef"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header" v-if="message">
          <strong class="me-auto">
            {{ message.title }}
          </strong>
          <button
            class="btn-close"
            data-bs-dismiss="toast"
          ></button>
        </div>

        <div class="toast-body" v-if="message">🎬 <strong>{{ message.movie }}</strong> {{ message.text }}</div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  min-width: 340px;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,.25);
}
.toast-header {
  background: #198754;
  color: white;
  font-weight: 600;
}
.toast-body {
  font-size: 15px;
  line-height: 1.5;
}
</style>