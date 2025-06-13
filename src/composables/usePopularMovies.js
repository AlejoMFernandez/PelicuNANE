import { ref } from 'vue';

const API_KEY = '95da69574700788bd87c2f4af971e0ea';
const BASE_URL = 'https://api.themoviedb.org/3';

export function usePopularMovies() {
  const movies = ref([]);
  const totalPages = ref(1);
  const loading = ref(false);
  const error = ref('');

  async function fetchMovies(page = 1) {
    loading.value = true;
    error.value = '';
    try {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`);
      if (!res.ok) throw new Error('No se pudieron cargar las películas populares');
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
