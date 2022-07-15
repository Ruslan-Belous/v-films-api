<template>
  <div class="wishlist-item">
    <div class="wishlist-item__poster">
      <img
        v-if="!isPosterVisible"
        :src="wishlistItemData.Poster"
        alt="Movie poster"
      />
      <img v-else :src="emptyPicture" alt="Empty picture" />
    </div>
    <div class="wishlist-item__details">
      <p class="title">{{ wishlistItemData.Title }}</p>
    </div>
    <v-button
      class="wishlist-item__btn-delete"
      @click="deleteWishlistItem"
      :btnTitle="'Delete'"
      :primary="true"
      :prependBtnIcon="'fa-trash-can'"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import emptyPicture from '@/assets/empty.jpeg'
import vButton from './v-button.vue'
export default {
  components: { vButton },
  name: 'v-wishlist-item',
  props: {
    wishlistItemData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data: () => ({
    emptyPicture,
  }),
  computed: {
    ...mapState(['wishlist']),
    isPosterVisible() {
      return this.wishlistItemData.Poster === 'N/A'
    },
  },
  methods: {
    ...mapMutations(['DELETE_WISHLIST_ITEM']),
    deleteWishlistItem() {
      this.DELETE_WISHLIST_ITEM(this.wishlistItemData.Title)
    },
  },
}
</script>

<style lang="scss" scoped>
.wishlist-item {
  width: 90%;
  height: 300px;
  position: relative;
  display: flex;
  background-color: #496583;
  margin-bottom: 20px;
  border-radius: 20px;
  &__poster {
    width: 50%;
    overflow: hidden;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px 0 0 20px;
    }
  }
  &__btn-delete {
    position: absolute;
    top: 279px;
    right: 17px;
    border-radius: 20px;
    max-width: 100px;
  }
  &__details {
    width: 50%;
    padding: 20px;
    color: #eee;
    .title {
      font-size: 26px;
      color: #fff;
      text-align: center;
      font-weight: 800;
      margin-bottom: 15px;
    }
  }
}
</style>
