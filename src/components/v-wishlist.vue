<template>
  <div class="wishlist">
    <v-wishlist-item
      v-for="item in chosenWishlistItems"
      :key="item.Title"
      :wishlistItemData="item"
      >{{ item.Title }}
    </v-wishlist-item>
    <p class="wishlist__empty" v-if="!wishlist.length">
      There are no chosen items...
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vWishlistItem from './v-wishlist-item.vue'
export default {
  components: { vWishlistItem },
  name: 'v-wishlist',
  data() {
    return {}
  },
  computed: {
    ...mapState(['wishlist']),
    chosenWishlistItems() {
      return this.wishlist.filter((item) => item.Title)
    },
  },
}
</script>

<style lang="scss" scoped>
.wishlist {
  display: flex;
  align-items: center;
  justify-content: center;
  &__logo {
    padding-right: 5px;
    width: 30px;
    height: 20px;
    color: #fff;
  }
  &__empty {
    margin: 50px;
    text-align: center;
    color: #fff;
  }
}
</style>
