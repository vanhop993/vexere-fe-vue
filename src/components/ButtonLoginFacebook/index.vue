<template>
  <div>
    <button
      class="btn btn-facebook w-100 my-1 btn-primary"
      @click.prevent="logInWithFacebook"
    >
        <i class="fab fa-facebook mr-1"></i>
      <span>Đăng nhập với Facebook</span>
    </button>
  </div>
</template>

<script>
import { A_SIGNIN_FACEBOOK } from "../../store/login/constant";
import { A_FETCH_PROFILE } from '../../store/profile/constant';
export default {
  methods: {
    logInWithFacebook() {
    window.FB.login(
        (response) => {
          if (response.authResponse) {
            this.$store.dispatch(A_SIGNIN_FACEBOOK,{access_token:response.authResponse.accessToken});
            this.$store.dispatch(A_FETCH_PROFILE);
         } else {
            alert("User cancelled login or did not fully authorize.");
          }
        }
      );
    },
  },
  mounted() {
      const scriptLoginFacebook = document.createElement("script");
      scriptLoginFacebook.setAttribute("async","");
      scriptLoginFacebook.setAttribute("defer","");
      scriptLoginFacebook.setAttribute("crossorigin","anonymous");
      scriptLoginFacebook.setAttribute("src","https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0&appId=422970552116996&autoLogAppEvents=1");
      scriptLoginFacebook.setAttribute("nonce","BS8CSYFr");
      document.body.appendChild(scriptLoginFacebook)
  },
};
</script>
<style>
.btn-facebook{
    background-color: #1877f2;
}
</style>