<template>
  <v-footer class="footer">
    <v-container class="footer-content d-flex flex-column flex-md-row align-center justify-space-between">
      <div class="footer-brand">
        <v-icon color="#e50914" size="large">mdi-movie-open</v-icon>
        <span class="footer-title">PelícuNANE</span>
      </div>
      <div class="footer-links">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener" class="footer-link">Powered by TMDB</a>
        <span class="footer-link">|</span>
        <a href="https://github.com/AlejoMFernandez/PelicuNANE" target="_blank" rel="noopener" class="footer-link">GitHub</a>
        <span class="footer-link">|</span>
        <span class="footer-link">© 2025</span>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: #181a1b;
  color: #fff;
  padding-top: 1rem;
  border-top: 1px solid #23272f;
  font-size: 1rem;
  position: static;
}
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.2rem;
}
.footer-title {
  color: #fff;
  font-weight: 700;
  letter-spacing: 1px;
}
.footer-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.footer-link {
  color: #b0b0b0;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-link:hover {
  color: #e50914;
}
</style>
