<template>
  <v-col cols="12" md="3">
    <v-card class="movie-card" :to="`/movie/${movie.id}`" hover>
      <v-img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" height="320" cover />
      <v-card-title class="text-truncate">{{ movie.title }}</v-card-title>
      <v-card-text class="text-truncate">{{ movie.release_date?.slice(0, 4) }}</v-card-text>
    </v-card>
  </v-col>
</template>

<script setup>
const props = defineProps({
  movie: Object
});
</script>

<style scoped>
.movie-card {
  background: #23272f;
  color: #fff;
  border-radius: 12px;
  min-height: 400px;
  box-shadow: 0 2px 8px #0003;
}
</style>
