<template>
  <div class="home">
    <v-search-form />
    <v-movie-list />
    <v-add-more />
  </div>
</template>

<script>
import VAddMore from '../components/v-add-more.vue'
import VLoader from '../components/v-loader.vue'
import vMovieList from '../components/v-movie-list.vue'
import VSearchForm from '../components/v-search-form.vue'
export default {
  components: { vMovieList, VLoader, VSearchForm, VAddMore },
}
</script>
<style lang="scss" scoped></style>
