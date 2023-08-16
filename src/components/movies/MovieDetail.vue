<template>
  <div class="overlay-main show"></div>
  <div class="expansion-section section active" v-if="isLoaded">
    <button class="back-btn btn btn-hv" @click="goBack">
      <i class="bx bx-chevron-left"></i> Back
    </button>
    <div class="video-overview-container">
      <div class="video-section">
        <div class="expand-sec video-trailer-container">
          <button class="close-video">x</button>
          <figure class="poster-container" >
            <img 
              class="video-poster-path"
              :src="'https://image.tmdb.org/t/p/w1280' + detail.backdrop_path"
            />
            <figure class="poster-desc-container">
              <h1 id="main-poster-title" class="poster-title">{{detail.title}}</h1>
              <button class="btn btn-hv poster-btn watch-poster-btn">
                <i class="bx bx-play"></i>
                <p class="btn-title">Watch Trailer</p>
              </button>
              <p class="view-count">{{ detail.view_count }} Views</p>
            </figure>
            <div class="overlay-poster"></div>
          </figure>
          <div class="loading-spinner"></div>
          <div class="loading-spinner2"></div>
          <iframe 
            class="trailer-video" 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/ZtuFgnxQMrA"
            title="YouTube video player"
            frameborder="0"
            allowfullscreen
          >

          </iframe>
        </div>
      </div>
      <ul class="poster-genre-tags">
        <li class="btn cursor-def active poster-genre-tag">Action</li>
        <li class="btn cursor-def active poster-genre-tag">Adventure</li>
        <li class="btn cursor-def active poster-genre-tag">Science Fiction</li>
      </ul>
      <div class="expand-sec movie-stats">
        <article class="rating-container flx flx-clmn flx-cntr">
          <p class="rating-text">8.6</p>
          <span class="rating-count">{{ detail.view_count }}</span>
        </article>
        <article class="other-details">
          <time class="other-detail date-detail">
            <mark>Release Date:</mark> {{ detail.release_date }}
          </time>
          <time class="other-detail duration-detail">
            <mark>Duration:</mark> 127min
          </time>
          <p class="other-detail status-detail">
            <mark>Status:</mark> Released
          </p>
        </article>
        <button class="btn btn-md flx flx-cntr bookmark-btn">
          <figure class="container-bookmark flx flx-cntr flx-gap-md">
            <i class="icon-bm bc bx-book-bookmark"></i>
            <figcaption class="bookmark-text">Vote</figcaption>
          </figure>
        </button>
      </div>
      <div class="expand-sec trailer-overview">
        <article class="trailer-desc-container">
          <p class="trailer-desc">
            {{ detail.overview }}
          </p>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store/index';
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
export default {
  name: "MovieDetail",
  props: {
    movieId: String
  },
  setup(props){
    const detail = ref({});
    const isLoaded = ref(false);
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    };
    onMounted(async () => {
      await store.dispatch('movies/fetchDetail', props.movieId);
      detail.value = store.state.movies.detail;
      isLoaded.value = store.state.movies.detail.isLoaded;
      const currentViewCount = store.state.movies.detail.view_count;
      await store.dispatch('movies/updateMovie', { id: props.movieId, view_count: currentViewCount + 1 });
    });
    return { detail, isLoaded, goBack };
  }
 
}
</script>