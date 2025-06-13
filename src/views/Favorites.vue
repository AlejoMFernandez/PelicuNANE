<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-4">Favoritos</h1>
      </v-col>
    </v-row>
    <v-row>
      <MovieCard v-for="movie in favorites" :key="movie.id" :movie="movie" />
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
