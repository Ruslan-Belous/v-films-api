<template>
  <footer class="v-footer">
    <fa icon="fa-clapperboard" class="v-footer__logo" />
    <h1><span>V</span>Films</h1>
  </footer>
</template>

<script>
export default {
  name: 'v-footer',
}
</script>

<style lang="scss" scoped>
.v-footer {
  padding: 10px 15px;
  background-color: #2c3d4e;
  box-shadow: 6px 0 0 rgba($color: #000000, $alpha: 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
