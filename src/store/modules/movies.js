
import IDs from '@/store/mock/imdb_top250.js'; // импортируем массив imdb id из mock файла
import axios from "@/plugins/axios"; // ловим instance (настроенный экземпляр) из axios/index.js, чтобы использовать его в actions
console.log(axios); // проверка, что instance axios импортирован корректно, и вывод его в консоль для отладки
console.dir(axios); // вывод структуры instance axios в консоль для отладки
console.log(axios.defaults); // проверка, что instance axios импортирован корректно, и вывод его настроек по умолчанию в консоль для отладки

const moviesStore = {
  // namespaced - это свойство, которое позволяет разделять состояние на отдельные модули. Если оно установлено в true, то все действия, мутации и геттеры будут доступны только внутри этого модуля.
  namespaced: true,
  // state - нужен для хранения данных, которые будут использоваться в приложении. Это может быть информация о пользователе, список фильмов, настройки и т.д.
  state: {
    top250Ids: IDs,
    moviesPerPage: 12,
    currentPage: 1,
  },
  // getters - это функции, которые позволяют получать данные из state.
  getters: {
    sliceIDs: ({ top250Ids }) => (from, to) => top250Ids.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage
  },
  mutations: {},
  // actions - это функции, которые могут быть асинхронными и использоваться для выполнения операций, таких как запросы к API. Они могут вызывать мутации для изменения состояния.
  actions: {
    async fetchMovies(context) {
      console.log("Fetching movies...", context); // получение контекста, который содержит state, getters, commit и dispatch
      // запрос на получения отдельного фильма tt1285016
      const response = await axios.get('/?i=tt1285016');
      console.log("Movies fetched axios:", response);
      console.log("Movies fetched data axios:", response.data);

    }
  },
};

export default moviesStore;