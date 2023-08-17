<template>
  <div class="overlay-main"></div>
  <section class="discover-section">
    <section class="section-header">
      <header class="header-filter">
        <h1 class="header-title">Trending Movies</h1>
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
        <router-link
          class="movie-card"
          v-for="movie in movieLists"
          :key="movie.id"
          @click="navigateToMovieDetail(movie)"
          :to="{ name: 'MovieDetail', params: { movieId: movie.id } }"
          >
          <img 
            class="movie-img"
            :alt="movie.title"
            :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w1280' + movie.poster_path : require('@/assets/images/img-notfound.jpg')"

          />
          <div class="overlay-card"></div>
          <button class="expand-btn">
            <i class="bx bx-expand expand-icon"></i>
            <p>Expand</p>
          </button>
          <div class="movie-info">
            <p class="movie-title">{{ movie.title }}</p>
            <p class="views-count">{{ movie.view_count }} views</p>
          </div>
        </router-link>
      </div>
      <div v-else class="loading">
        <div class="placeholder"></div>
        <div class="loading-spinner"></div>
        <div class="loading-spinner2"></div>
      </div>
      <section v-if="isLoaded" class="movie-pagination">
        <Pagination :pagination="pagination" :fetchLists="fetchList"/>
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
import store from '@/store/index';
import { ref, onMounted } from 'vue';
import Pagination from '../components/paginations/Pagination';
export default{
  name: "Trending",
  components:{
    Pagination
  },
  methods: {
    navigateToMovieDetail(movie) {
      store.commit('setMovieDetail', movie);
    }
  },
  setup() {
    const movieLists = ref([]);
    const isLoaded = ref(false);
    const pagination = ref({
      page: 1,
      total_pages: 0,
      total_results: 0,
      current_page_last: 0,
    });
    onMounted(async () => {
      await store.dispatch('movies/fetchTrending');
      pagination.value = store.state.movies.pagination;
      movieLists.value = store.state.movies.list;
      isLoaded.value = store.state.movies.isLoaded;
    });

    async function fetchList(page, itemsPerPage) {
      try {
        await store.dispatch('movies/fetchTrending', page, itemsPerPage);
        movieLists.value = store.state.movies.list;
        pagination.value = store.state.movies.pagination;
      } catch (error) {
        console.error('Error fetching movie list:', error.message);
      }
    }

    return { movieLists, isLoaded, pagination, fetchList };
  },
}
</script>