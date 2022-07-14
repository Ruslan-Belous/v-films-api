<template>
  <div class="sort-section" v-if="isSortSectionVisible">
    <v-select
      class="select"
      :selected="selected"
      :options="types"
      @select="sortByTypes"
    />
    <button @click="onYearFilter" class="btn-sort" value="Year">
      Year
      <fa v-if="ascending" icon="fa-arrow-down" />
      <fa v-else icon="fa-arrow-up " />
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vSelect from './v-select.vue'
export default {
  components: { vSelect },
  name: 'v-sort-section',
  data() {
    return {
      types: [
        {
          name: 'All',
          type: 'ALL',
        },
        {
          name: 'Movie',
          type: 'movie',
        },
        {
          name: 'Series',
          type: 'series',
        },
      ],
      selected: 'All',
      sortedMovies: [],
    }
  },
  computed: {
    ...mapState(['movies']),
    isSortSectionVisible() {
      return this.movies.length
    },
    sortedMoviesArr() {
      return this.sortedMovies.length ? this.sortedMovies : this.movies
    },
  },
  methods: {
    sortByTypes(type) {
      this.sortedMovies = []
      let vm = this

      this.movies.map((item) => {
        if (item.Type === type.type) {
          vm.sortedMovies.push(item)
        }
      })
      this.selected = type.name
    },
    onYearFilter() {
      // this.ascending = !this.ascending
      // this.SORT_MOVIES_BY_YEAR(this.ascending)
      ;(this.ascending = !this.ascending),
        this.ascending
          ? (this.sortedMoviesArr = this.sortedMoviesArr.sort((a, b) =>
              a.Year > b.Year ? 1 : -1
            ))
          : (this.sortedMoviesArr = this.sortedMoviesArr.sort((a, b) =>
              a.Year > b.Year ? -1 : 1
            ))
      return this.sortedMoviesArr
    },
  },
}
</script>

<style lang="scss" scoped></style>
