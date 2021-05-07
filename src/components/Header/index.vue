<template>
  <div>
    <nav class="navbar navbar-expand-md p-0">
      <div class="container px-2">
        <button
          class="navbar-toggler"
          type="button"
          @click="openMenuMobi = !openMenuMobi"
        >
          <span class="fas fa-bars"></span>
        </button>
        <router-link exact="true" class="nav-link" to="/">
          <Logo :classLogo="'classLogo'" />
        </router-link>
        <div class="container-btn d-block d-md-none">
          <User />
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto"></ul>
          <div class="container-btn">
            <a href="" class="text-decoration-none">Quản lý vé</a>
          </div>
          <div class="container-btn">
            <ButtonHotline />
          </div>
          <div class="container-btn">
            <User />
          </div>
        </div>
      </div>
    </nav>
    <transition name="navbar-menu-mobi-toggle">
      <div v-if="openMenuMobi" class="navbar-menu-mobi bg-light w-100 p-3">
        Quản lý vé
      </div>
    </transition>
  </div>
</template>
<script>
import Logo from "../Logo";
import User from "../User";
import ButtonHotline from "../../components/ButtonHotline";
export default {
  data() {
    return {
      openMenuMobi: false,
    };
  },
  components: {
    Logo,
    User,
    ButtonHotline,
  },
  mounted() {
    document.addEventListener("click", (e) => {
      const navBarMenuMobi = document.getElementsByClassName(
        "navbar-menu-mobi"
      )[0];
      const btnToggleMenuMobi = document.getElementsByClassName(
        "navbar-toggler"
      )[0];
      if (
        navBarMenuMobi &&
        !navBarMenuMobi.contains(e.target) &&
        this.openMenuMobi &&
        !btnToggleMenuMobi.contains(e.target)
      ) {
        this.openMenuMobi = false;
      }
    });
  },
};
</script>
<style scoped>
.classLogo {
  transition-duration: 0.5s;
  font-size: 1.5rem;
  cursor: pointer;
}
.btn {
  border: 1px solid;
  color: #fff;
  background-color: transparent;
}
.btn:hover {
  background-color: transparent;
}
.container-btn {
  margin-left: 20px;
}
.navbar {
  box-shadow: none;
}
.navbar-menu-mobi {
  position: absolute;
  z-index: 1;
  top: 59px;
  bottom: 0;
}
.navbar-menu-mobi-toggle-enter-active {
  transition: all 0.3s ease-out;
}
.navbar-menu-mobi-toggle-leave-active {
  transition: all 0.3s ease-out;
}
.navbar-menu-mobi-toggle-enter-from,
.navbar-menu-mobi-toggle-leave-to {
  transform: translateX(-100%);
}
.navbar-toggler {
  color: white;
}
@media screen and (min-width: 768px) {
  .navbar {
    height: 60px;
    box-shadow: 2px 3px 10px rgb(58, 56, 56);
    z-index: 10;
  }
  .btn{
  background-color: rgb(0, 96, 196);
  }
  .btn:hover {
    background-color: #40a9ff;
  }
}
</style>