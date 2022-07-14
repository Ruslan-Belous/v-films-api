<template>
  <div class="wishlist-item">
    {{ wishlistItemData.Title }}
    <div class="movie-detail__poster">
      <img :src="wishlistItemData.Poster" alt="Movie poster" />
      <!-- <img v-else :src="emptyPicture" alt="Empty picture" /> -->
      <button @click="deleteWishlistItem">DELETE</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'v-wishlist-item',
  props: {
    wishlistItemData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapState(['wishlist']),
  },
  methods: {
    ...mapMutations(['DELETE_WISHLIST_ITEM']),
    deleteWishlistItem() {
      this.DELETE_WISHLIST_ITEM(this.wishlistItemData.Title)
    },
  },
}
</script>

<style lang="scss" scoped></style>
