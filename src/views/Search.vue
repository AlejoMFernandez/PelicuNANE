<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="query" label="Buscar películas" prepend-inner-icon="mdi-magnify" @keyup.enter="onSearch" clearable @click:clear="clearSearch" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-select v-model="genre" :items="genres" label="Género" item-title="name" item-value="id" clearable />
      </v-col>
      <v-col cols="12" md="4">
        <v-select v-model="certification" :items="certifications" label="Clasificación" clearable />
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
import { useSearchMovies } from '../composables/useSearchMovies';
import { useGenres } from '../composables/useGenres';
import { useCertifications } from '../composables/useCertifications';

const query = ref('');
const genre = ref(null);
const certification = ref(null);
const page = ref(1);

const { movies, totalPages, loading, error, fetchMovies } = useSearchMovies();
const { genres } = useGenres();
const { certifications } = useCertifications();

function onSearch() {
  page.value = 1;
  fetchMovies(query.value, genre.value, certification.value, page.value);
}
function clearSearch() {
  query.value = '';
  onSearch();
}

watch([query, genre, certification, page], () => {
  fetchMovies(query.value, genre.value, certification.value, page.value);
});

onMounted(() => {
  fetchMovies(query.value, genre.value, certification.value, page.value);
});
</script>
