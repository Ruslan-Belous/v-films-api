<template>
  <div class="search-box-wrapp">
    <form class="search-box" @submit.prevent="searchMovies">
      <input
        type="text"
        placeholder="What are you looking for ?"
        v-model="searchKey"
      />
      <v-button
        class="search-box__btn"
        type="submit"
        :primary="true"
        :disabled="!canSearch"
        :btnTitle="'Search'"
        :prependBtnIcon="'magnifying-glass'"
      />
    </form>
    <v-loader :isLoading="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import VButton from './v-button.vue'
import VLoader from './v-loader.vue'
export default {
  name: 'v-search-form',
  components: { VLoader, VButton },
  data() {
    return {
      searchKey: '',
      isLoading: false,
    }
  },
  computed: {
    canSearch() {
      return this.searchKey.trim()
    },
  },
  methods: {
    ...mapActions(['getMovies']),
    ...mapMutations(['SET_SEARCH_KEY', 'CLEAR_MOVIE_LIST']),
    async searchMovies() {
      if (this.searchKey) {
        this.CLEAR_MOVIE_LIST()
      }
      this.isLoading = true
      if (this.searchKey !== '') {
        this.SET_SEARCH_KEY(this.searchKey)
        await this.getMovies()
      }
      this.searchKey = ''
      this.isLoading = false
    },
  },
}
</script>

<style lang="scss">
.search-box {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  input {
    display: block;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    &::placeholder {
      color: #aaa;
    }
    &[type='text'] {
      width: 100%;
      color: #fff;
      background-color: #496583;
      font-size: 20px;
      text-align: center;
      padding: 10px 15px;
      border-radius: 10px;
      margin-bottom: 15px;
      transition: 0.4s;
    }
    &:focus {
      box-shadow: 0 3px 3px rgba($color: #aaa, $alpha: 0.2);
    }
  }
  &__btn {
    max-width: 300px;
    font-size: 20px;
    text-transform: uppercase;
    transition: 0.4s;
    &:active,
    :hover,
    :focus {
      background-color: #3b8070;
    }
  }
}
</style>
