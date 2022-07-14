<template>
  <div class="select">
    <p class="select__title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selected }}
    </p>
    <div class="select__options" v-show="areOptionsVisible">
      <p
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
      >
        {{ option }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-select',
  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
    selected: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      areOptionsVisible: false,
    }
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option)
      this.areOptionsVisible = false
    },
    hideSelect() {
      this.areOptionsVisible = false
    },
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeDestroy() {
    document.addEventListener('click', this.hideSelect)
  },
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  cursor: pointer;
  p {
    margin: 0;
    padding: 8px 16px;
  }
  &__title {
    color: var(--white);
  }
  &__options {
    position: absolute;
    top: 24px;
    right: 0;
    width: 100%;
    background: inherit;
    z-index: 1;
    border-radius: 0 0 10px 10px;
    padding-top: 5px;
    p {
      padding: 6px 5px;
      user-select: none;
      color: var(--white);
    }
    p:hover {
      background-color: #353535;
    }
    p:last-of-type:hover {
      background-color: #353535;
      border-radius: 0 0 9px 9px;
    }
  }
}
</style>
