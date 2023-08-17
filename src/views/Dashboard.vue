<template>
  <div class="dashboard">
    <h3 class="dashboard-title">Movie List</h3>
    <div class="dashboard-content" v-if="isLoaded">
      <div class="movie-list">
        <div class="search-add-container">
          <div class="search-bar">
            <input v-model="searchQuery" @input="searchMovies" placeholder="Search..." />
            <button @click="clearSearch">Clear</button>
          </div>
          <button @click="showAddForm" class="btn-primary">Add Movie</button>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Genre</th>
                <th>View</th>
                <th>Artist</th>
                <th>Overview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(movie, index) in movies" :key="movie.id">
                <td>{{ index + 1 }}</td>
                <td>{{ movie.title }}</td>
                <td>{{ movie.genre }}</td>
                <td>{{ movie.view_count }}</td>
                <td>{{ movie.artist }}</td>
                <td>{{ movie.overview }}</td>
                <td>
                  <button @click="showEditForm(movie)" class="btn-secondary">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <div class="placeholder"></div>
      <div class="loading-spinner"></div>
      <div class="loading-spinner2"></div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index';
import { ref, watch, onMounted } from 'vue';
export default {
  props:{
    searchTerm: String
  },
  methods: {
    showAddForm() {
      this.$router.push({ name: "MovieCreate" });
    },
    showEditForm(movie) {
      this.$router.push({
        name: 'MovieUpdate',
        params: { movieId: movie.id }
      });
    },
    clearSearch() {
      this.searchQuery = '';
    }
  },
  setup(){
    const movies = ref([]);
    const isLoaded = ref(false);
    const pagination = ref({
      page: 1,
      total_pages: 0,
      total_results: 0,
      current_page_last: 0,
    });
    const searchQuery = ref('');
    watch(searchQuery, async (newSearchTerm) => {
      await store.dispatch('movies/searchMovie', newSearchTerm);
      pagination.value = store.state.movies.pagination;
      movies.value = store.state.movies.list;
      isLoaded.value = store.state.movies.isLoaded;
    });
    onMounted(async () => {
      await store.dispatch('movies/fetchMovies');
      pagination.value = store.state.movies.pagination;
      movies.value = store.state.movies.list;
      isLoaded.value = store.state.movies.isLoaded;
    });
    return { movies, pagination, searchQuery, isLoaded };
  }
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  padding: 20px;
  max-width: 80%;
  margin-right: 10px;
  margin-left: 10%;
}

.dashboard-title {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: left;
}

.dashboard-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-add-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.search-bar button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #0b91ea;
  color: #FFF;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #80b8dd;
}
.table-container {
  width: 100%;
  overflow-x: auto;
}

.table {
  border-collapse: collapse;
  margin-top: 10px;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.table th {
  background-color: #f1f3f5;
  font-weight: bold;
}

.table td:last-child {
  text-align: center;
}

.btn-primary,
.btn-secondary,
.btn-danger {
  padding: 5px 10px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #43bb9f;
}

.btn-secondary {
  background-color: #e74c3c;
}

.btn-danger {
  background-color: #e74c3c;
}

.btn-primary:hover,
.btn-secondary:hover,
.btn-danger:hover {
  background-color: #000;
}
</style>
