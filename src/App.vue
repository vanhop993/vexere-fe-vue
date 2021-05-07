<template>
  <router-view/>
</template>
<script>
import { A_TRY_SIGNIN } from './store/login/constant';

export default {
  created() {
    this.$store.dispatch(A_TRY_SIGNIN);
  },
}
</script>

<style>
body{
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
