<template>
  <header class="v-header">
    <div @click="goToHome" class="v-header__home">
      <fa icon="fa-video" class="v-header__logo" />
      <h1><span>V</span>Films</h1>
    </div>
    <div @click="goToWishlist" class="v-header__wishlist">
      <fa icon="fa-list" class="v-header__logo" />
      <span class="qunatity-in-wishlist" v-if="isQunatityVisible">
        {{ wishlist.length }}</span
      >
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'v-header',
  computed: {
    ...mapState(['wishlist']),
    isQunatityVisible() {
      return this.wishlist.length
    },
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' }).catch(() => {})
    },
    goToWishlist() {
      this.$router.push({ name: 'Wishlist' }).catch(() => {})
      localStorage.clear()
    },
  },
}
</script>

<style lang="scss" scoped>
.v-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #2c3d4e;
  box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.1);
  &__home,
  &__wishlist {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  &__wishlist {
    position: relative;
    background-color: var(--primary);
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    padding: 8px 4px;
    align-items: center;
    cursor: pointer;
  }
  &__logo {
    padding-right: 5px;
    width: 30px;
    height: 20px;
    color: #fff;
  }
  h1 {
    color: #fff;
    font-size: 26px;
    span {
      color: #42b883;
    }
  }
}
.qunatity-in-wishlist {
  position: absolute;
  top: 0px;
  right: -4px;
  width: 18px;
  height: 18px;
  background-color: #ff623f;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>
