<template>
  <div class="overlay-main"></div>
  <section class="section-1">
    <section class="section-header">
      <header class="header-filter">
        <h1 class="header-title">Discover Movies</h1>
        <button class="header-filter-btn">Genre</button>
      </header>
      <div class="header-btns-container">
        <i class="bx bx-filter filter-icon-btn"></i>
        <i class="bx bx-menu menu-btn"></i>
      </div>
      <div class="filter-btn-container">
        <ul class="filters-btns"></ul>
      </div>
    </section>
    <main class="movie-main">
      <div class="movie-cards" v-if="isLoaded">
        <div
          class="movie-card"
          v-for="movie in movieLists"
          :key="movie.id"
        >
          <img 
            class="movie-img"
            :alt="movie.title"
            :src="'https://image.tmdb.org/t/p/w1280' + movie.poster_path"
          />
          <div class="overlay-card"></div>
          <button class="expand-btn">
            <i class="bx bx-expand expand-icon"></i>
            <p>Expand</p>
          </button>
          <div class="movie-info">
            <p class="movie-title">{{ movie.title }}</p>
          </div>
        </div>
      </div>
      <div v-else class="loading">
        <div class="placeholder"></div>
        <div class="loading-spinner"></div>
        <div class="loading-spinner2"></div>
      </div>
      <section class="movie-pagination">

      </section>
      <footer>
        <p>
          Copyright © 2023
          <a class="copyright-user-link" 
          target="_blank" 
          href="https://twitter.com/sopyanalansory">@sopyanalansory</a>. All Rights Reserved
        </p>
      </footer>
    </main>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';

export default{
  name: "Home",
  components:{},
  setup() {
    const movieLists = ref([]);
    const isLoaded = ref(false);

    async function fetchMovieLists() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=b51b535b2fa399a23d7dfdf78f4f91c3&language=en-US', { method: 'GET' });
        const data = await response.json();
        movieLists.value = data.results;
        isLoaded.value = true;
        console.log('hasil -->', data.results);
      } catch (error) {
        console.error('Error fetching movie list:', error);
      }
    }

    onMounted(fetchMovieLists);

    return { movieLists, isLoaded };
  },
}
</script>