# Películas Vue App

Aplicación web en Vue 3 + Vite + Vuetify + Pinia + Vue Router para buscar, ver y guardar películas favoritas usando la API de TMDB.

## Funcionalidades principales
- Lista de películas populares (paginación)
- Búsqueda por título
- Filtros por género y clasificación
- Detalle de película (título, descripción, año, póster, etc.)
- Agregar a favoritos (localStorage)
- UI dark mode, mobile first

## Estructura sugerida
- `/src/components/` → MovieCard, MovieList, SearchBar, Navbar, Pagination, etc.
- `/src/views/` → Home, Search, MovieDetail, Favorites
- `/src/store/` → Pinia store para favoritos
- `/src/composables/` → Lógica de fetch, paginación, etc.

## Cómo iniciar
```sh
npm install
npm run dev
```

## Personalización
- Cambia el color y tema en `vuetify.js`.
- Reemplaza las claves de la API de TMDB en los composables.

---

Este proyecto está listo para desarrollo profesional y extensible.
