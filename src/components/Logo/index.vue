<template>
  <div
    class="logo text-center d-flex justify-content-center"
    :class="classLogo"
  >
    <router-link exact to="/"
      class="m-0 d-flex justify-content-center align-items-center logo-container text-decoration-none"
    >
        <Icon :class="'fas fa-bus-alt mr-2'" />
        <span class="nameLogo">Vexere</span>
    </router-link>
  </div>
</template>
<script>
import Icon from "../Icon";
export default {
  components: { Icon },
  props: ["classLogo"],
};
</script>
<style>
.logo-container {
  color: white;
}
.nameLogo:hover{
  text-decoration: none;
}
@media screen and (min-width: 768px) {
  .logo-container {
    color: #2474e5;
  }
}
</style>