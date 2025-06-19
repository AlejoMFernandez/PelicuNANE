<template>
  <v-container fluid class="home-bg pa-0">
    <MovieCarousel
      title="Populares"
      :movies="popularMovies"
      v-if="!loadingPopular && !errorPopular"
    />
    <MovieCarousel
      title="Mejor Valoradas"
      :movies="topRatedMovies"
      v-if="!loadingTopRated && !errorTopRated"
    />
    <MovieCarousel
      title="Estrenos"
      :movies="upcomingMovies"
      v-if="!loadingUpcoming && !errorUpcoming"
    />
    <!-- Puedes agregar más carrouseles por género si lo deseas -->
    <v-row v-if="loadingPopular || loadingTopRated || loadingUpcoming">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="48" />
      </v-col>
    </v-row>
    <v-row v-if="errorPopular || errorTopRated || errorUpcoming">
      <v-col cols="12">
        <v-alert type="error">{{ errorPopular || errorTopRated || errorUpcoming }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MovieCarousel from '../components/MovieCarousel.vue';
import { usePopularMovies } from '../composables/usePopularMovies';

const { movies: popularMovies, loading: loadingPopular, error: errorPopular, fetchMovies: fetchPopular } = usePopularMovies();

// Fetch top rated
const topRatedMovies = ref([]);
const loadingTopRated = ref(true);
const errorTopRated = ref('');

// Fetch upcoming
const upcomingMovies = ref([]);
const loadingUpcoming = ref(true);
const errorUpcoming = ref('');

const API_KEY = '95da69574700788bd87c2f4af971e0ea';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTopRated() {
  loadingTopRated.value = true;
  errorTopRated.value = '';
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`);
    if (!res.ok) throw new Error('No se pudieron cargar las mejor valoradas');
    const data = await res.json();
    topRatedMovies.value = data.results;
  } catch (e) {
    errorTopRated.value = e.message;
  } finally {
    loadingTopRated.value = false;
  }
}

async function fetchUpcoming() {
  loadingUpcoming.value = true;
  errorUpcoming.value = '';
  try {
    const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`);
    if (!res.ok) throw new Error('No se pudieron cargar los estrenos');
    const data = await res.json();
    upcomingMovies.value = data.results;
  } catch (e) {
    errorUpcoming.value = e.message;
  } finally {
    loadingUpcoming.value = false;
  }
}

onMounted(() => {
  fetchPopular(1);
  fetchTopRated();
  fetchUpcoming();
});
</script>

<style scoped>
.home-bg {
  min-height: 100vh;
  padding-top: 0;
}
</style>
