import axios from "@/plugins/axios";

const moviesStore = {
  // namespaced - это свойство, которое позволяет разделять состояние на отдельные модули. Если оно установлено в true, то все действия, мутации и геттеры будут доступны только внутри этого модуля.
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  // actions - это функции, которые могут быть асинхронными и использоваться для выполнения операций, таких как запросы к API. Они могут вызывать мутации для изменения состояния.
  actions: {
    async fetchMovies(context) {
      console.log("Fetching movies...", context);
      // запрос на получения отдельного фильма tt1285016
      const response = await axios.get('/?i=tt1285016');
      console.log("Movies fetched:", response);
      console.log("Movies fetched data:", response.data);

    }
  },
};

export default moviesStore;