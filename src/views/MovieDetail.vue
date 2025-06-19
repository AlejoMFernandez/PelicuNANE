<template>
  <v-container class="py-8 d-flex justify-center">
    <v-row class="movie-detail-row" align="center" justify="center" no-gutters>
      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          class="movie-poster"
          height="480"
          width="320"
          cover
        />
      </v-col>
      <v-col cols="12" md="8" class="movie-info-col">
        <div class="movie-title-row">
          <h1 class="movie-title">{{ movie.title }}</h1>
        </div>
        <div class="movie-extra-info mb-2">
          <span v-if="movie.vote_average" class="vote-average">
            <v-icon size="small" color="#FFD700">mdi-star</v-icon>
            {{ movie.vote_average?.toFixed(1) }}
          </span>
        </div>
        <div class="movie-meta-row mb-2">
          <span v-for="g in movie.genres" :key="g.id" class="meta-chip">{{ g.name }}</span>
          <span v-if="movie.certification" class="meta-chip">{{ movie.certification }}</span>
          <span class="meta-chip">{{ movie.release_date?.slice(0, 4) }}</span>
        </div>
        <div class="movie-overview mb-4">{{ movie.overview }}</div>
        <v-btn
          color="#e50914"
          class="favorite-btn-detail mt-4"
          @click="toggleFavorite"
          variant="flat"
          size="large"
        >
          <v-icon :color="isFavorite ? '#fff' : '#e50914'">
            {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
          <span class="ml-2">{{ isFavorite ? 'Favorito' : 'Agregar a favoritos' }}</span>
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

<style scoped>
.movie-detail-row {
  max-width: 1100px;
  margin: 0 auto;
  flex-wrap: nowrap;
  flex-direction: row;
  display: flex;
}
.movie-poster {
  border-radius: 18px;
  box-shadow: 0 4px 32px #000a;
  object-fit: cover;
}
.movie-info-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-left: 2rem;
}
.movie-title-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
.movie-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  letter-spacing: 0.5px;
}
.favorite-btn-detail {
  background: #e50914 !important;
  color: #fff !important;
  border-radius: 24px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px #0005;
  transition: background 0.2s, color 0.2s;
  text-transform: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.favorite-btn-detail .v-icon {
  font-size: 1.5rem;
}
.movie-meta-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1rem;
}
.meta-chip {
  background: #23272f;
  color: #fff;
  border-radius: 8px;
  padding: 0.25rem 0.8rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.2px;
  margin-right: 0.2rem;
}
.movie-overview {
  color: #b0b0b0;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: left;
}
.vote-average {
  color: #FFD700;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
@media (max-width: 900px) {
  .movie-detail-row {
    flex-direction: column !important;
    max-width: 98vw;
    flex-wrap: wrap;
  }
  .movie-info-col {
    padding-left: 0;
    padding-right: 0;
    margin-top: 2rem;
    margin-left: 0;
  }
  .movie-poster {
    width: 90vw;
    height: 340px;
    margin: 0 auto;
  }
  .d-flex{
      display: block !important;
  }
}
</style>
