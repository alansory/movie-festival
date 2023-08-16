// import { reactive } from "vue";

// const state = reactive({
//   user: null,
//   movieDetail:null,
// });

// const methods = {
//   setUser(payload){
//     state.user = payload ? payload.user : null;
//   },
//   setMovieDetail(state, movieDetail) {
//     state.movieDetail = movieDetail;
//   },
// };

// export default {
//   state,
//   methods
// }

import { createStore } from 'vuex';
import movies from './modules/movie';

const store = createStore({
  modules: {
    movies,
  },
  state: {
    user: null,
    movieDetail: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload ? payload.user : null;
    },
    setMovieDetail(state, movieDetail) {
      state.movieDetail = movieDetail;
    },
  },
});

export default store;
