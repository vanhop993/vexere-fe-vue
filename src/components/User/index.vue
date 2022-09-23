<template>
  <router-link
    exact
    to="/signin"
    class="text-decoration-none btn"
    v-if="!getterProfile"
  >
    <div class="d-flex align-items-center btn-sign-content">
      <i class="far fa-user mr-1"></i>
      <span class="d-none d-md-block">Đăng nhập</span>
    </div>
  </router-link>
  <div v-else class="btn-group">
    <div
      class="btn-dropdown"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <img class="avatar" :src="getterProfile.avatar" alt="avartar.png" />
    </div>
    <div class="dropdown-menu dropdown-menu-right">
      <router-link class="dropdown-item text-decoration-none" to="/profile"
        >Profile</router-link
      >
      <button class="dropdown-item" type="button" @click="handleLogin">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import {
  A_FETCH_PROFILE,
  A_REMOVE_PROFILE,
} from "../../store/profile/constant";
import { mapGetters } from "vuex";
import { A_SIGN_OUT, A_TRY_SIGNIN } from "../../store/login/constant";
export default {
  computed: {
    ...mapGetters(["getterProfile"]),
  },
  methods: {
    handleLogin() {
      this.$store.dispatch(A_SIGN_OUT);
      this.$store.dispatch(A_REMOVE_PROFILE);
      this.$router.push("/")
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$store.dispatch(A_TRY_SIGNIN);
      this.$store.dispatch(A_FETCH_PROFILE);
    }
  },
};
</script>

<style scoped>
.btn-dropdown {
  cursor: pointer;
}
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.btn-sign-content {
  color: white;
}
</style>