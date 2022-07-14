import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    movieDetail: {},
    searchKey: '',
    moviePage: 1,
    moviesCount: 0,
    wishlist: []
  },
  plugins: [createPersistedState()],
  mutations: {
    SORT_MOVIES_BY_YEAR: (state, value) => {
      value
        ? (state.movies = state.movies.sort((a, b) => a.Year > b.Year ? 1 : -1))
        : (state.movies = state.movies.sort((a, b) => a.Year > b.Year ? -1 : 1))
    },
    CLEAR_MOVIE_LIST: (state) => state.movies = [],
    SET_MOVIES_COUNT: (state, value) => state.moviesCount = value,
    UPDATE_MOVIES: (state, movies) => state.movies = movies,
    // UPDATE_MOVIES_BY_ADD_MORE: (state, movies) =>
    //   state.movies.length ? movies.forEach(el => state.movies.push(el)) : state.movies = movies,
    UPDATE_MOVIE_CARD: (state, movieDetail) => state.movieDetail = movieDetail,
    SET_SEARCH_KEY: (state, key) => state.searchKey = key,
    SET_MOVIE_PAGE: (state) => state.moviePage += 1,
    SET_WISHLIST: (state, movieDetail) => {
      if (!state.wishlist.some(el => el.Title === movieDetail.Title)) state.wishlist.push(movieDetail)

    },
    DELETE_WISHLIST_ITEM: (state, id) => state.wishlist = state.wishlist.filter(el => el.Title !== id)
  },
  actions: {
    async getMovies({ state, commit }, type = null) {
      const params = {
        s: state.searchKey,
        page: state.moviePage,
        type
      }
      const moviesResponse = await axios
        .get('', { params })
        .catch(err => console.log(err))
      commit('UPDATE_MOVIES', moviesResponse.data.Search)
      commit('SET_MOVIES_COUNT', moviesResponse.data.totalResults)
      commit('UPDATE_MOVIE_CARD', moviesResponse.data)
    },

    async getMovieDetail({ commit }, id) {
      const params = {
        i: id,
        plot: 'full'
      }
      try {
        const movieDetailResponce = await axios
          .get('', { params })
          .catch(err => console.log(err))
        commit('UPDATE_MOVIE_CARD', movieDetailResponce.data)
      } catch (error) {
        console.log(error, 'eroorrr')

      }
    },
    addToWishlist({ commit }, movieDetail) {
      commit('SET_WISHLIST', movieDetail)
    }
  },
  getters: {},
  modules: {}
})

