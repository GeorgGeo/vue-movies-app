import mutations from '@/store/mutations.js'; // импортируем объект с мутациями из mutations.js

const { SHOW_TOAST_NOTIFY } = mutations;

const notificationStore = {
  namespaced: true,
  state: {
    messagePool: [],
  },
  getters: {
    messagePoolGetter: ({ messagePool }) => messagePool[messagePool.length - 1], // возвращаем последний элемент массива messagePool
  },
  mutations: {
    [SHOW_TOAST_NOTIFY](state, message) {
      state.messagePool.push(message); // добавляем новое сообщение в массив messagePool
    }
  },
  actions: {
    showToastNotification({ commit }, message) {
      commit(SHOW_TOAST_NOTIFY, message); // вызываем мутацию SHOW_TOAST_NOTIFY и передаем ей сообщение
    }
  },
};

export default notificationStore;