<template>
  <div class="movie-list">
    <div class="movie-list__sort-section" v-if="isSortSectionVisible">
      <v-select
        class="select"
        :selected="selectedType"
        :options="types"
        @select="sortByTypes"
      />
      <button
        @click="sortByYearDirection = !sortByYearDirection"
        class="btn-sort"
      >
        Year
        <fa v-if="sortByYearDirection" icon="fa-arrow-down" />
        <fa v-else icon="fa-arrow-up " />
      </button>
    </div>
    <v-movie-list-card
      v-for="movie in movies"
      :key="movie.imdbID"
      :movies_data="movie"
      v-cloak
    />
    <v-loader :isLoading="isLoading" />
    <p class="movie-list__else" v-if="!isSortSectionVisible">
      There are no movies...
    </p>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import vSelect from './v-select.vue'
import emptyPicture from '@/assets/empty.jpeg'
import VButton from './v-button.vue'
import VLoader from './v-loader.vue'
import VMovieListCard from './v-movie-list-card.vue'

export default {
  components: { vSelect, VButton, VLoader, VMovieListCard },
  name: 'v-movie-list',
  data() {
    return {
      emptyPicture,
      sortByYearDirection: true,
      types: ['All', 'Movie', 'Series'],
      selectedType: 'All',
      isLoading: false,
    }
  },
  computed: {
    ...mapState(['movies']),
    isSortSectionVisible() {
      return this.movies && !!this.movies.length
    },
  },
  watch: {
    async selectedType() {
      if (this.selectedType === 'All') {
        await this.getMovies()
      } else {
        await this.getMovies(this.selectedType.toLowerCase())
      }
    },
    sortByYearDirection() {
      this.SORT_MOVIES_BY_YEAR(this.sortByYearDirection)
    },
  },
  methods: {
    ...mapActions(['getMovies']),
    ...mapMutations(['SET_MOVIE_PAGE', 'SORT_MOVIES_BY_YEAR']),
    sortByTypes(type) {
      this.isLoading = true
      this.selectedType = type
      this.isLoading = false
    },
    addMore() {
      this.SET_MOVIE_PAGE()
      const getMovieMore = this.getMovies()
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  &__sort-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
  }
  &__else {
    color: var(--white);
    font-size: 16px;
  }
}
.select {
  background-color: var(--secondary);
  font-size: 16px;
  border-radius: 10px;
  width: 30%;
  text-align: center;
}
.btn-sort {
  background-color: var(--secondary);
  font-size: 16px;
  color: var(--white);
  padding: 6px 5px;
  border-radius: 10px;
  width: 30%;
  cursor: pointer;
}
[v-cloak] {
  display: none;
}
</style>
