<template>
  <div id="app">
    <v-header />
    <main>
      <router-view />
      <v-scroll-up />
    </main>
    <v-footer />
  </div>
</template>

<script>
import VFooter from './components/v-footer.vue'
import vHeader from './components/v-header.vue'
import VScrollUp from './components/v-scroll-up.vue'
export default {
  components: { vHeader, VFooter, VScrollUp },
}
</script>

<style lang="scss">
* {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none !important;
}
body {
  background-color: #353535;
}
a {
  text-decoration: none;
  color: red;
}
button {
  border: none;
  appearance: none;
  outline: none;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100%;
  --white: #ffffff;
  --black: #000000;
  --primary: #42b883;
  --secondary: #496583;
  font-family: 'Apis', sans-serif;
  // width: 100vw;
  // height: 100vh;
  // overflow: auto;
}
main {
  flex: 1 1 auto;
}
</style>
