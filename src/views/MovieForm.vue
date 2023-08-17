<template>
  <div class="movie-container">
    <form @submit.prevent="submitForm" class="movie-form">
    <h3>{{ formTitle }}</h3>
    <label class="label" for="title">Title:</label>
    <input v-model="detail.title" type="text" class="input" required />

    <label class="label" for="genre">Genre:</label>
    <input v-model="detail.genre" type="text" class="input" required />

    <label class="label" for="artist">Artist:</label>
    <input v-model="detail.artist" type="text" class="input" required />

    <label class="label" for="poster_path">Poster url:</label>
    <input v-model="detail.poster_path" type="text" class="input" required />

    <label class="label" for="backdrop_path">Watch url:</label>
    <input v-model="detail.backdrop_path" type="text" class="input" required />

    <label class="label" for="overview">Description:</label>
    <textarea v-model="detail.overview" class="input" required></textarea>

    <button type="submit" class="btn-primary" :disabled="isLoading">
      {{ isLoading ? 'Submitting...' : 'Submit' }}
    </button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { supabase } from "@/supabase/init";
export default {
  props: {
    formTitle: String,
    editMode: Boolean,
    movieId: String,
  },
  setup(props) {
    const detail = ref({
      title: "",
      genre: "",
      artist: "",
      poster_path: "",
      backdrop_path: "",
      overview: "",
    });
    const successMessage = ref(null);
    const errorMessage = ref(null);
    const isLoading = ref(false);
    async function fetchMovieData() {
      try {
        const { data, error } = await supabase
          .from("movie")
          .select("*")
          .eq("id", props.movieId)
          .single();
        if (error) {
          errorMessage.value = "Error fetching movie data: " + error.message;
        } else {
          detail.value = data;
        }
      } catch (error) {
        errorMessage.value = "Error fetching movie data: " + error.message;
      }
    }

    async function submitForm() {
      try {
        isLoading.value=true;
        if (props.movieId) {
          const { data, error } = await supabase
            .from("movie")
            .update(detail.value)
            .eq("id", props.movieId);
          if (error) {
            errorMessage.value = "Error updating movie: " + error.message;
            successMessage.value = "";
            isLoading.value=false;
          } else {
            successMessage.value = "Movie updated successfully!";
            errorMessage.value = "";
            isLoading.value=false;
            console.log('Movie updated',data, successMessage);
          }
        } else {
          const { data, error } = await supabase.from("movie").insert([detail.value]);
          if (error) {
            errorMessage.value = "Error adding movie: " + error.message;
            successMessage.value = "";
            isLoading.value=false;
          } else {
            successMessage.value = "Movie added successfully!";
            detail.value = {
              title: "",
              genre: "",
              artist: "",
              poster_path: "",
              backdrop_path: "",
              overview: "",
            };
            errorMessage.value = "";
            isLoading.value=false;
            console.log('Movie added', data, successMessage);
          }
        }
      } catch (error) {
        isLoading.value=false;
        errorMessage.value = "Error: " + error.message;
        successMessage.value = "";
      }
    }

    onMounted(() => {
      if (props.movieId) {
        fetchMovieData();
      }
    });

    return {
      detail,
      isLoading,
      successMessage,
      errorMessage,
      submitForm,
    };
  }
}
</script>

<style scoped>
.movie-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.movie-form {
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 620px;
  padding: 45px;
  background-color: #fff;
}

.label {
  margin-bottom: 5px;
  display: block;
}

.input {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
}

.btn-primary {
  padding: 12px;
  background-color: #43bb9f;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 90px;
  margin-top: 10px;
}

.error-message {
  color: #e74c3c;
  margin-top: 10px;
}

.success-message {
  color: #43bb9f;
  margin-top: 10px;
}
</style>
