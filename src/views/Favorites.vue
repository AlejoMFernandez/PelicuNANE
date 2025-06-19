<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-4">Favoritos</h1>
      </v-col>
    </v-row>
    <v-row>
      <MovieCard
        v-for="movie in favorites"
        :key="movie.id"
        :movie="movie"
        class="favorite-movie-col"
      />
      <v-col v-if="favorites.length === 0" cols="12">
        <v-alert type="info">No tienes películas favoritas aún.</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useFavoritesStore } from '../store/favorites';
import MovieCard from '../components/MovieCard.vue';

const store = useFavoritesStore();
const favorites = store.favorites;
</script>

<style scoped>
.favorite-movie-col {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-row {
  gap: 1rem 0.5rem;
  justify-content: flex-start;
}
@media (max-width: 600px) {
  .favorite-movie-col {
    width: 120px;
    min-width: 120px;
    max-width: 120px;
  }
}
</style>
