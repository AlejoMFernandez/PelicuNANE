<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" height="420" cover />
      </v-col>
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">{{ movie.title }}</h1>
        <div class="mb-2">Año: {{ movie.release_date?.slice(0, 4) }}</div>
        <div class="mb-2">Géneros: <span v-for="g in movie.genres" :key="g.id">{{ g.name }} </span></div>
        <div class="mb-2">Clasificación: {{ movie.certification || 'N/A' }}</div>
        <div class="mb-4">{{ movie.overview }}</div>
        <v-btn color="primary" @click="toggleFavorite">
          {{ isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="48" />
      </v-col>
    </v-row>
    <v-row v-if="error">
      <v-col cols="12">
        <v-alert type="error">{{ error }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFavoritesStore } from '../store/favorites';

const route = useRoute();
const movie = ref({});
const loading = ref(false);
const error = ref('');
const API_KEY = '95da69574700788bd87c2f4af971e0ea';

const store = useFavoritesStore();
const isFavorite = computed(() => store.isFavorite(movie.value.id));

async function fetchMovie() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${API_KEY}&language=es-ES`);
    if (!res.ok) throw new Error('No se pudo cargar la película');
    movie.value = await res.json();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

function toggleFavorite() {
  if (isFavorite.value) {
    store.removeFavorite(movie.value.id);
  } else {
    store.addFavorite(movie.value);
  }
}

onMounted(fetchMovie);
</script>
