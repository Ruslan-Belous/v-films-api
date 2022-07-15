<template>
  <div class="movie-detail-wrapp">
    <div class="movie-detail">
      <h2 class="movie-detail__title">{{ movieDetail.Title }}</h2>
      <div class="movie-detail__top">
        <div class="movie-detail__poster" @click="openPopupInfo">
          <img
            v-if="!isPosterVisible"
            :src="movieDetail.Poster"
            alt="Movie poster"
          />
          <img v-else :src="emptyPicture" alt="Empty picture" />
          <div class="zoom">
            <span class="zoom__more">
              <fa icon="fa-up-right-and-down-left-from-center" /> More
              details</span
            >
          </div>
          <p class="movie-detail__rating">{{ movieDetail.imdbRating }}</p>
        </div>
        <p class="movie-detail__desciption">{{ movieDetail.Plot }}</p>
      </div>
      <v-button
        class="movie-detail__btn-add"
        @click="addToWishList"
        :primary="true"
        :btnTitle="'Add to wishlist'"
        :appendBtnIcon="'fa-list'"
      />
      <p><strong>Year:</strong> {{ movieDetail.Year }}</p>
      <p><strong>Country:</strong> {{ movieDetail.Country }}</p>
      <p><strong>Genre:</strong> {{ movieDetail.Genre }}</p>
      <p class="movie-detail__type">
        <strong>Type:</strong> {{ movieDetail.Type }}
      </p>
      <p><strong>Runtime:</strong> {{ movieDetail.Runtime }}.</p>
      <p><strong>Released:</strong> {{ movieDetail.Released }}.</p>
      <p><strong>Actors:</strong> {{ movieDetail.Actors }}.</p>
    </div>
    <v-popup
      v-if="isPopupIsnfoVisible"
      @close-popup="closeInfoPopup"
      @right-btn-action="addToWishList"
      right-btn-title="Add to wishlist"
      :popup-title="movieDetail.Title"
    >
      <div class="more-details">
        <p class="more-details__country">
          <strong>Country:</strong> {{ movieDetail.Country }}
        </p>
        <p class="more-details__country">
          <strong>Year:</strong> {{ movieDetail.Year }}
        </p>
        <p class="more-details__country">
          <strong>Actors:</strong> {{ movieDetail.Actors }}
        </p>
        <p class="more-details__country">
          <strong>Director:</strong> {{ movieDetail.Director }}
        </p>
        <p class="more-details__country">
          <strong>Genre:</strong> {{ movieDetail.Genre }}
        </p>
        <p class="more-details__country">
          <strong>Language:</strong> {{ movieDetail.Language }}
        </p>
        <p class="more-details__country">
          <strong>Released:</strong> {{ movieDetail.Released }}
        </p>
        <p class="more-details__country">
          <strong>Runtime:</strong> {{ movieDetail.Runtime }}
        </p>
        <p class="more-details__country">
          <strong>Type:</strong> {{ movieDetail.Type }}
        </p>
        <p class="more-details__country">
          <strong>Writer:</strong> {{ movieDetail.Writer }}
        </p>
        <p class="more-details__imdbRating">
          <strong>imdbRating:</strong> {{ movieDetail.imdbRating }}
        </p>
        <p
          class="more-details__international-rating"
          v-for="(rait, i) in movieDetail.Ratings"
          :key="i"
        >
          <strong>{{ rait.Source }}</strong
          >: <span>{{ rait.Value }}</span>
        </p>
      </div>
    </v-popup>
    <v-push-notification :messages="messages" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import vPopup from '../components/v-popup.vue'
import emptyPicture from '@/assets/empty.jpeg'
import VButton from '../components/v-button.vue'
import VPushNotification from '../components/notifications/v-push-notification.vue'
export default {
  components: { vPopup, VButton, VPushNotification },
  name: 'movie-detail',
  props: {
    movie_detail: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      isPopupIsnfoVisible: false,
      emptyPicture,
      messages: [],
    }
  },
  computed: {
    ...mapState(['movieDetail', 'wishlist']),
    isPosterVisible() {
      return this.movieDetail.Poster === 'N/A'
    },
  },
  methods: {
    ...mapMutations(['SET_WISHLIST']),
    openPopupInfo() {
      this.isPopupIsnfoVisible = true
      document.body.style.position = 'fixed'
      document.body.style.overflow = 'hidden'
    },
    closeInfoPopup() {
      this.isPopupIsnfoVisible = false
      document.body.style.position = ''
      document.body.style.overflow = ''
    },
    addToWishList() {
      this.SET_WISHLIST(this.movieDetail)
      localStorage.setItem('test', JSON.stringify(this.movieDetail))
      const addNotification = () => {
        // this.messages.unshift({
        //   id: this.movieDetail.Title,
        //   name: 'Item has been added',
        // })
        let isThereCurrentTitle = this.messages.some(
          (el) => el.id === this.movieDetail.Title
        )
        if (!isThereCurrentTitle) {
          this.messages.unshift({
            id: this.movieDetail.Title,
            name: 'Item has been added',
          })
        }
        // else {
        //   this.getAdditionalPush(this.messages)
        // }
      }
      addNotification()
      this.closeInfoPopup()
    },
    getAdditionalPush(array) {
      array.forEach((el) => {
        if (el.id === this.movieDetail.Title) {
          this.messages.unshift({
            additionalPush: 'This item is already added',
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-detail-wrapp {
  margin: 15px;
}
.movie-detail {
  width: 90%;
  margin: 0 auto;
  color: #eeeaee;
  p {
    margin-bottom: 5px;
    strong {
      font-size: 18px;
    }
  }
  &__title {
    color: #fff;
    text-align: center;
    font-weight: 600;
  }
  &__top {
    display: flex;
    margin-top: 25px;
    justify-content: space-between;
  }
  &__desciption {
    width: 58%;
    max-width: 100%;
    font-size: 18px;
    padding: 0 25px;
  }
  &__rating {
    position: absolute;
    top: -20px;
    left: -20px;
    font-size: 16px;
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #42b883;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    z-index: 100;
    &::after {
      content: '';
      position: absolute;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 1px solid #353535;
    }
  }
  &__poster {
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  &__type {
    text-transform: capitalize;
  }
  &__btn-add {
    max-width: 300px;
    margin: 8px 0;
  }
}
.more-details {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 8px 0;
}
.zoom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0;
  transition: 0.25s ease;
  backdrop-filter: blur(10px);
  border-top: 32px solid rgba(0, 0, 0, 0.99);
  border-bottom: 32px solid rgba(0, 0, 0, 0.99);
}
.zoom:hover {
  opacity: 1;
  cursor: pointer;
}

@media (max-width: 1200px) {
}

@media (max-width: 992px) {
}

@media (max-width: 767px) {
}

@media (max-width: 480px) {
  .movie-detail {
    &__top {
      flex-wrap: wrap;
      margin-top: 20px;
    }
    &__poster {
      margin: 0 auto;
    }
    &__desciption {
      margin: 10px auto;
      width: 90%;
    }
    &__btn-add {
      margin: 8px auto;
    }
  }
}
</style>
