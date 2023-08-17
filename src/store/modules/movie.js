import { fetchMovieLists, fetchTrandingLists, fetchMovieDetail, updateMovie, searchMovie } from '@/supabase/movie';

const state = {
  list:[],
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
  async fetchMovies({ commit }, page, itemsPerPage) {
    const data = await fetchMovieLists(page, itemsPerPage);
    commit('setMovies', data);
  },
  async fetchTrending({ commit }, page, itemsPerPage) {
    const data = await fetchTrandingLists(page, itemsPerPage);
    commit('setMovies', data);
  },
  async fetchDetail({ commit }, id) {
    const data = await fetchMovieDetail(id);
    commit('setDetail', data)
  },
  async searchMovie({ commit }, query){
    const data = await searchMovie(query);
    commit('setMovies', data)
  },
  async updateMovie({ commit }, payload) {
    const data = await updateMovie(payload.id, payload);
    commit('setDetail', data)
  }
};

const mutations = {
  setMovies(state, data) {
    state.isLoaded = true;
    state.list = data;
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
