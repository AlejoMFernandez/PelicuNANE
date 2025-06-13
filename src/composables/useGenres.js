import { ref, onMounted } from 'vue';

const API_KEY = '95da69574700788bd87c2f4af971e0ea';
const BASE_URL = 'https://api.themoviedb.org/3';

export function useGenres() {
  const genres = ref([]);

  async function fetchGenres() {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`);
    const data = await res.json();
    genres.value = data.genres || [];
  }

  onMounted(fetchGenres);
  return { genres };
}
