<template>
  <div class="add-more-section" v-if="isAddMoreVisible">
    <div class="pagination">
      <p>{{ movies.length }}</p>
      ofs
      <p>{{ moviesCount }}</p>
    </div>
    <button class="btn" @click="addMoreMovies">
      <fa icon=" fa-circle-chevron-down" class="btn__icon" />
      add more
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'add-more-section',
  computed: {
    ...mapState(['movies', 'moviesCount']),
    isAddMoreVisible() {
      return this.movies && this.movies.length
    },
  },
  methods: {
    ...mapActions(['getMovies']),
    ...mapMutations(['SET_MOVIE_PAGE']),
    addMoreMovies() {
      this.SET_MOVIE_PAGE()
      const getMovieMore = this.getMovies()
    },
  },
}
</script>

<style lang="scss" scoped>
.add-more-section {
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btn {
  align-self: center;
  width: 100%;
  max-width: 300px;
  color: #fff;
  background-color: #42b883;
  font-size: 20px;
  text-transform: uppercase;
  padding: 10px 15px;
  border-radius: 10px;
  transition: 0.4s;
  cursor: pointer;
  margin-bottom: 10px;
  &:active {
    background-color: #3b8070;
  }
}
.pagination {
  display: flex;
  justify-content: space-around;
  color: #fff;
  width: 200px;
  align-self: center;
  margin-bottom: 10px;
}
</style>
