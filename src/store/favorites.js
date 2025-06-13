import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
  }),
  actions: {
    addFavorite(movie) {
      if (!this.favorites.find(m => m.id === movie.id)) {
        this.favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
    },
    removeFavorite(id) {
      this.favorites = this.favorites.filter(m => m.id !== id);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    isFavorite(id) {
      return this.favorites.some(m => m.id === id);
    }
  }
});
