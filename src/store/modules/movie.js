import { fetchMovieLists, fetchMovieDetail, updateMovie } from '@/supabase/movie';

const state = {
  discover:[],
  pagination:{
    page:0,
    total_pages:0,
    total_results:0,
    current_page_last:500,
  },
  isLoaded: false,
  detail:{
    isLoaded:false,
  },
};

const getters = {};

const actions = {
  async fetchMovies({ commit }) {
    const data = await fetchMovieLists();
    commit('setMovies', data);
  },
  async fetchDetail({ commit }, id) {
    const data = await fetchMovieDetail(id);
    commit('setDetail', data)
  },
  async updateMovie({ commit }, payload) {
    const data = await updateMovie(payload.id, payload);
    commit('setDetail', data)
  }
};

const mutations = {
  setMovies(state, data) {
    state.isLoaded = true;
    state.discover = data;
    // state.pagination.page = data.page;
    // state.pagination.total_pages = data.total_pages;
    // state.pagination.total_results = data.total_results;
  },
  setDetail(state, data){
    state.detail = data;
    state.detail.isLoaded = true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
