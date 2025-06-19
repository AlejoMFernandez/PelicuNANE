<template>
  <div class="carousel-section">
    <div class="carousel-header">
      <h2 class="carousel-title">{{ title }}</h2>
      <div class="carousel-actions">
        <v-btn icon variant="text" @click="scrollLeft">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon variant="text" @click="scrollRight">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <div ref="carousel" class="carousel-list">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" :show-favorite="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MovieCard from './MovieCard.vue';

const props = defineProps({
  title: String,
  movies: Array
});

const carousel = ref(null);

function scrollLeft() {
  if (carousel.value) {
    carousel.value.scrollBy({ left: -320, behavior: 'smooth' });
  }
}
function scrollRight() {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 320, behavior: 'smooth' });
  }
}
</script>

<style scoped>
.carousel-section {
  margin-bottom: 2rem;
}
.carousel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.carousel-title {
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
}
.carousel-actions {
  display: flex;
  gap: 0.5rem;
}
.carousel-list {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 1rem;
  padding-bottom: 0.5rem;
}
.carousel-list::-webkit-scrollbar {
  display: none;
}
</style>
