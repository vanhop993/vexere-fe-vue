<template>
  <section class="container-all">
    <Header />
    <router-view></router-view>
    <Footer />
  </section>
</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.container-all {
  overflow-y: auto;
  background: url("/img/curve-background.png") left top / contain no-repeat
    local;
}
@media screen and (min-width: 768px) {
  .container-all {
    background: none;
  }
}
</style>