<template>
  <v-app-bar app color="primary" dark class="navbar-responsive">
    <v-toolbar-title class="font-weight-bold">🎬 PelícuNANE</v-toolbar-title>
    <div class="nav-links">
      <v-btn to="/" variant="text" color="white">Inicio</v-btn>
      <v-btn to="/search" variant="text" color="white">Buscar</v-btn>
      <v-btn to="/favorites" variant="text" color="white">Favoritos</v-btn>
    </div>
    <button class="menu-icon" @click="toggleMenu" aria-label="Abrir menú" :aria-expanded="menuOpen.toString()">
      <span :class="{ 'open': menuOpen }"></span>
      <span :class="{ 'open': menuOpen }"></span>
      <span :class="{ 'open': menuOpen }"></span>
    </button>
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <v-btn to="/" variant="text" color="white" @click="closeMenu">Inicio</v-btn>
      <v-btn to="/search" variant="text" color="white" @click="closeMenu">Buscar</v-btn>
      <v-btn to="/favorites" variant="text" color="white" @click="closeMenu">Favoritos</v-btn>
    </div>
    <div v-if="menuOpen" class="menu-backdrop" @click="closeMenu"></div>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
const menuOpen = ref(false);
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
function closeMenu() {
  menuOpen.value = false;
}
</script>

<style>
.navbar-responsive {
  position: relative;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.menu-icon {
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin-left: 1rem;
  z-index: 2100;
}
.menu-icon span {
  height: 3px;
  width: 25px;
  background: white;
  margin-bottom: 4px;
  border-radius: 2px;
  transition: all 0.3s;
  display: block;
}
.menu-icon span:last-child {
  margin-bottom: 0;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #1976d2;
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 2000;
  transition: all 0.3s;
  opacity: 0;
  pointer-events: none;
}
.mobile-menu.open {
  display: flex;
  opacity: 1;
  pointer-events: auto;
}
.menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.2);
  z-index: 1999;
}
@media (max-width: 600px) {
  .nav-links {
    display: none !important;
  }
  .menu-icon {
    display: flex !important;
  }
}
</style>
