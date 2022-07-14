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
    <div class="movie-card" v-for="movie in movies" :key="movie.imdbID" v-cloak>
      <div @click="goToMovieDetail(movie.imdbID)" class="movie-card__link">
        <div class="movie-card__detail">
          <h3 class="movie-card__detail__title">{{ movie.Title }}</h3>
          <p class="movie-card__detail__year">{{ movie.Year }}</p>
        </div>
        <div class="movie-card__type">{{ movie.Type }}</div>
        <div class="movie-card__poster">
          <img
            v-if="!(movie.Poster === 'N/A')"
            :src="movie.Poster"
            alt="Movie poster"
          />
          <img v-else :src="emptyPicture" alt="empty" />
        </div>
      </div>
    </div>
    <!-- <div class="add-more-section" v-if="movies.length">
      <div class="pagination">
        <p>{{ sortedMoviesArr.length }}</p>
        of
        <p>{{ moviesCount }}</p>
      </div>
      <button class="btn" @click="addMore">
        <fa icon=" fa-circle-chevron-down" class="btn__icon" />
        add more
      </button>
    </div> -->
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

export default {
  components: { vSelect, VButton, VLoader },
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
    ...mapState(['movies', 'moviesCount', 'movieDetail']),
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
    ...mapActions(['getMovieDetail', 'getMovies']),
    ...mapMutations(['SET_MOVIE_PAGE', 'SORT_MOVIES_BY_YEAR']),
    async goToMovieDetail(movieID) {
      await this.getMovieDetail(movieID)
      await this.$router.push({
        name: 'MovieDetail',
        params: {
          id: movieID,
        },
      })
    },
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
  .movie-card {
    width: 310px;
    margin: 15px;
    cursor: pointer;
    &__link {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      z-index: 0;
    }
    &__detail {
      background-color: var(--secondary);
      padding: 10px 8px;
      flex: 1 1 100%;
      border-radius: 8px 8px 0 0;
      &__title {
        color: var(--white);
        font-size: 18px;
        font-weight: 600;
      }
      &__year {
        color: #aaa;
        font-size: 14px;
        margin-top: 5px;
      }
    }
    &__type {
      position: absolute;
      background-color: rgba($color: #42b883, $alpha: 0.95);
      padding: 8px 15px;
      color: var(--white);
      top: 125px;
      left: 0;
      text-transform: capitalize;
      z-index: 1;
    }
    &__poster {
      display: block;
      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 0 0 8px 8px;
      }
    }
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
