<template>
  <div class="movie-card-minimal">
    <v-card class="movie-card-img" flat :to="`/movie/${movie.id}`" hover>
      <v-img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" height="320" cover />
    </v-card>
    <div class="movie-card-footer">
      <span class="movie-title">{{ movie.title }}</span>
      <v-btn
        icon
        class="favorite-btn"
        :class="{ active: isFavorite }"
        @click.stop="toggleFavorite"
        aria-label="Favorito"
        variant="plain"
      >
        <v-icon :color="isFavorite ? '#e50914' : '#fff'">mdi-heart</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '../store/favorites';

const props = defineProps({
  movie: Object,
  showFavorite: { type: Boolean, default: true }
});

const store = useFavoritesStore();
const isFavorite = computed(() => store.isFavorite(props.movie.id));

function toggleFavorite() {
  if (isFavorite.value) {
    store.removeFavorite(props.movie.id);
  } else {
    store.addFavorite(props.movie);
  }
}
</script>

<style scoped>
.movie-card-minimal {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  margin: 0;
}
.movie-card-img {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px #000a;
  background: #181a1b;
  transition: transform 0.2s;
}
.movie-card-img:hover {
  transform: scale(1.04);
  box-shadow: 0 4px 24px #000c;
}
.movie-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.movie-title {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}
.favorite-btn {
  border-radius: 50%;
  background: transparent !important;
  color: #fff;
  transition: background 0.2s, color 0.2s, border 0.2s;
  margin-left: 0.5rem;
  border: none;
}
.favorite-btn.active {
  background: transparent !important;
  color: #e90e18;
  border: none;
  animation: pop 0.25s;
}
@keyframes pop {
  0% { transform: scale(1); }
  60% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
@media (max-width: 600px) {
  .movie-card-minimal {
    width: 120px;
  }
  .movie-card-img {
    height: 180px;
  }
  .movie-title {
    font-size: 0.85rem;
  }
}
</style>
