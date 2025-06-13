<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-4">Películas Populares</h1>
      </v-col>
    </v-row>
    <v-row>
      <template v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="48" />
        </v-col>
      </template>
      <template v-else-if="error">
        <v-col cols="12">
          <v-alert type="error">{{ error }}</v-alert>
        </v-col>
      </template>
      <template v-else>
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </template>
    </v-row>
    <v-row justify="center" class="mt-6">
      <v-pagination v-model="page" :length="totalPages" color="primary" />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import { usePopularMovies } from '../composables/usePopularMovies';

const page = ref(1);
const { movies, totalPages, loading, error, fetchMovies } = usePopularMovies();

watch(page, (val) => fetchMovies(val));
onMounted(() => fetchMovies(page.value));
</script>
