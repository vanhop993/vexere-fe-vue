<template>
  <div>
    <button
      class="btn btn-google w-100 my-1 btn-danger"
      @click.prevent="onLogin"
    >
      <i class="fab fa-google mr-1"></i> Đăng nhập với Google
    </button>
  </div>
</template>
<script>
import { A_SIGNIN_GOOGLE } from '../../store/login/constant';
import { A_FETCH_PROFILE } from '../../store/profile/constant';
export default {
  methods: {
    onLogin() {
      window.gapi.auth2.authorize({
        client_id: '628495028887-u19q9uhusaklnbnrrvs1r164p8lpabs3.apps.googleusercontent.com',
        scope: 'email profile openid',
        response_type: 'id_token permission'
      }, (response) => {
        if (response.error) {
          return;
        }
        this.$store.dispatch(A_SIGNIN_GOOGLE,{access_token:response.access_token});
        this.$store.dispatch(A_FETCH_PROFILE);
      });
    }
  },
  mounted() {
    const scripGoogleLogin = document.createElement("script");
    scripGoogleLogin.setAttribute(
      "src",
      "https://apis.google.com/js/api:client.js"
    );
    document.head.appendChild(scripGoogleLogin);
  },
};
</script>
<style>
</style>