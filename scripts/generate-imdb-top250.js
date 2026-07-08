import fs from 'fs'; // импортируем модуль fs (File System) для работы с файловой системой, чтобы читать и записывать файлы

const movies = JSON.parse(
  fs.readFileSync('./scripts/movies.json', 'utf8')
);

// В этом JSON id хранится как число.
// Превращаем его в imdbID вида tt0111161
const ids = movies.top250movies.map(movie =>
  `tt${String(movie.id).padStart(7, '0')}`
);

const content =
`export default ${JSON.stringify(ids, null, 2)};
`;

fs.writeFileSync(
  './src/store/mock/imdb_top250.js',
  content
);

console.log(`✅ Создано ${ids.length} imdb id`);