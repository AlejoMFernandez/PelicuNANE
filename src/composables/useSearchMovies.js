import { ref } from 'vue';

const API_KEY = '95da69574700788bd87c2f4af971e0ea';
const BASE_URL = 'https://api.themoviedb.org/3';

export function useSearchMovies() {
  const movies = ref([]);
  const totalPages = ref(1);
  const loading = ref(false);
  const error = ref('');

  async function fetchMovies(query = '', genre = null, certification = null, page = 1) {
    loading.value = true;
    error.value = '';
    try {
      let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`;
      if (genre) url += `&with_genres=${genre}`;
      if (certification) url += `&certification_country=AR&certification=${certification}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('No se pudieron cargar los resultados');
      const data = await res.json();
      movies.value = data.results;
      totalPages.value = data.total_pages > 500 ? 500 : data.total_pages;
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return { movies, totalPages, loading, error, fetchMovies };
}
