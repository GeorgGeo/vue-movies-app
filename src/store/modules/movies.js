
import IDs from '@/store/mock/imdb_top250.js'; // импортируем массив imdb id из mock файла
import axios from "@/plugins/axios"; // ловим instance (настроенный экземпляр) из axios/index.js, чтобы использовать его в actions
console.log(axios); // проверка, что instance axios импортирован корректно, и вывод его в консоль для отладки
console.dir(axios); // вывод структуры instance axios в консоль для отладки
console.log(axios.defaults); // проверка, что instance axios импортирован корректно, и вывод его настроек по умолчанию в консоль для отладки
// import mutations from '@/store/mutations.js'; // импортируем объект с мутациями из mutations.js

function serializeMovies(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    // console.log("Accumulator:", acc); //!! вывод в консоль текущего состояния аккумулятора для отладки, Chrome показывает текущее состояние объекта, а не состояние в момент console.log. Поэтому кажется, что уже на первой итерации было 12 фильмов.
    console.log("Actual state:", {...acc}); // настоящее состояние после каждой итерации
    return acc;
  }, {});
}

const moviesStore = {
  // namespaced - это свойство, которое позволяет разделять состояние на отдельные модули. Если оно установлено в true, то все действия, мутации и геттеры будут доступны только внутри этого модуля.
  namespaced: true,
  // state - нужен для хранения данных, которые будут использоваться в приложении. Это может быть информация о пользователе, список фильмов, настройки и т.д.
  state: {
    top250Ids: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
  },
  // getters - это функции, которые позволяют получать данные из state.
  getters: {
    moviesListGetter: ({ movies }) => movies, // возвращаем объект фильмов из state
    sliceIDs: ({ top250Ids }) => (from, to) => top250Ids.slice(from, to),
    currentPageGetter: ({ currentPage }) => currentPage,
    moviesPerPageGetter: ({ moviesPerPage }) => moviesPerPage,
    totalPagesGetter: ({ top250Ids, moviesPerPage}) => Math.ceil(top250Ids.length / moviesPerPage),
  },
  // mutations - это функции, которые изменяют состояние state. Они должны быть синхронными и единственным способом изменения состояния.
  mutations: {
    SET_MOVIES(state, movies) {
      // state.movies = { ...state.movies, ...movies }; // объединяем старые фильмы с новыми, чтобы не терять уже загруженные данные
      state.movies = movies; // загружаем только текущие 12 фильмов
    },
    MOVIES(state, value) {
      state.movies = value; // устанавливаем новые фильмы, заменяя старые
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    }
  },
  // actions - это функции, которые могут быть асинхронными и использоваться для выполнения операций, таких как запросы к API. Они могут вызывать мутации для изменения состояния.
  actions: {
    // initMoviesStore: {
    //   handler(context) {
    //     context.dispatch('fetchMovies'); // вызываем action fetchMovies для загрузки фильмов при инициализации модуля
    //   },
    //   root: true
    // },
    async fetchMovies(context) {
      console.log("Fetching movies...", context); // получение контекста, который содержит state, getters, commit и dispatch
      try {
        const { currentPageGetter, moviesPerPageGetter, sliceIDs } = context.getters; // деструктуризация объекта getters для получения текущей страницы и количества фильмов на странице
        const from = (currentPageGetter - 1) * moviesPerPageGetter; // вычисление индекса начала среза массива top250Ids
        const to = from + moviesPerPageGetter; // вычисление индекса конца среза массива top250Ids

        const moviesToFetch = sliceIDs(from, to); // получение среза массива top250Ids с помощью геттера sliceIDs
        console.log("Movies to fetch:", moviesToFetch); // вывод в консоль массива фильмов, которые нужно получить
        const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`)); // создание массива промисов для каждого запроса к API с использованием axios
        console.log("Movies request:", requests); // вывод в консоль массива промисов для отладки

        const responses = await Promise.all(requests); // ожидание выполнения всех промисов и получение массива ответов, когда интерсептора не было, axios.get() возвращал объект AxiosResponse.
        console.log("Movies fetched:", responses);

        const movies = serializeMovies(responses); // сериализация массива ответов в массив объектов фильмов
        console.log("Movies fetched serialized:", movies); // вывод в консоль массива сериализованных фильмов для отладки

        // запрос на получения отдельного фильма tt1285016
        // const response = await axios.get('/?i=tt1285016');
        // console.log("Movies fetched axios:", response);
        // console.log("Movies fetched data axios:", response.data);
        context.commit('SET_MOVIES', movies); // вызов мутации SET_MOVIES для обновления состояния с новыми фильмами
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
  },
};

export default moviesStore;