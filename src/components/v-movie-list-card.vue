<template>
  <div class="movie-card"></div>
</template>

<script>
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
}
</script>

<style lang="scss" scoped></style>
