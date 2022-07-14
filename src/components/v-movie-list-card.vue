<template>
  <div class="movie-card">
    <div @click="goToMovieDetail(movies_data.imdbID)" class="movie-card__link">
      <div class="movie-card__detail">
        <h3 class="movie-card__detail__title">{{ movies_data.Title }}</h3>
        <p class="movie-card__detail__year">{{ movies_data.Year }}</p>
      </div>
      <div class="movie-card__type">{{ movies_data.Type }}</div>
      <div class="movie-card__poster">
        <img
          v-if="!(movies_data.Poster === 'N/A')"
          :src="movies_data.Poster"
          alt="Movie poster"
        />
        <img v-else :src="emptyPicture" alt="empty" />
      </div>
    </div>
  </div>
</template>

<script>
import emptyPicture from '@/assets/empty.jpeg'
import { mapActions } from 'vuex'
export default {
  name: 'v-movie-list-card',
  props: {
    movies_data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      emptyPicture,
    }
  },
  methods: {
    ...mapActions(['getMovieDetail']),
    async goToMovieDetail(movieID) {
      await this.getMovieDetail(movieID)
      await this.$router.push({
        name: 'MovieDetail',
        params: {
          id: movieID,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
