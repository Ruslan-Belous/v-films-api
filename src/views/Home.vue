<template>
  <div class="home">
    <v-search-form />
    <v-movie-list />
    <v-scroll-up />
    <v-add-more />
  </div>
</template>

<script>
import VAddMore from '../components/v-add-more.vue'
import VLoader from '../components/v-loader.vue'
import vMovieList from '../components/v-movie-list.vue'
import VScrollUp from '../components/v-scroll-up.vue'
import VSearchForm from '../components/v-search-form.vue'
export default {
  components: { vMovieList, VLoader, VScrollUp, VSearchForm, VAddMore },
}
</script>
<style lang="scss" scoped></style>
