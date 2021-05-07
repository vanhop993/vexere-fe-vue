<template>
  <Loader v-if="loadingAuth" />
  <div v-else class="signin-container">
    <PanelTitle :title="'Đăng nhập'">
      <form>
        <Input
          :title="'Tài khoản'"
          :type="'text'"
          :name="'username'"
          :placeholder="'Username'"
          :min="4"
          :max="16"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <Input
          :title="'Mật khẩu'"
          :type="'password'"
          :name="'password'"
          :placeholder="'Password'"
          :min="8"
          :max="16"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <button class="w-100 btn btn-success" @click.prevent="handleSubmit">
          <span class="fas fa-bus-alt mr-2" />Đăng nhập
        </button>
        <div class="signin-boundary d-flex my-2 text-center">
          <span class="m-auto">hoặc</span>
        </div>
        <div class="d-flex flex-wrap flex-sm-nowrap">
          <div class="signin-btn-other mr-0 mr-sm-1">
            <ButtonLoginFacebook />
          </div>
          <div class="signin-btn-other">
            <ButtonLoginGoogle />
          </div>
        </div>
        <div>
          Bạn chưa có tài khoản ?
          <router-link exact to="/signup">Đăng ký</router-link>
        </div>
        <div>
          Bạn quên mật khẩu ?
          <router-link exact to="/forgetpassword">Lấy lại mật khẩu</router-link>
        </div>
      </form>
    </PanelTitle>
  </div>
</template>
<script>
import PanelTitle from "../../../components/Panel/PanelTitle";
import ButtonLoginFacebook from "../../../components/ButtonLoginFacebook";
import ButtonLoginGoogle from "../../../components/ButtonLoginGoogle";
// import { mapGetters } from "vuex";
import Loader from "../../../components/Loader";
import Input from "../../../components/Input/Input";
import { A_SIGNIN_APP } from "../../../store/login/constant";
// import { A_FETCH_PROFILE } from '../../../store/profile/constant';

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      invalid: {
        username: true,
        password: true,
      },
      submit: true,
    };
  },
  components: {
    PanelTitle,
    ButtonLoginFacebook,
    ButtonLoginGoogle,
    Loader,
    Input,
  },
  computed: {
    // ...mapGetters(["loadingAuth"]),
  },
  methods: {
    handleValue(name, value, invalidInput) {
      this.form[name] = value;
      this.invalid[name] = invalidInput;
    },
    handleSubmit() {
      this.submit = !this.submit;
      const arrInvalid = Object.values(this.invalid);
      for (let item of arrInvalid) {
        if (item) return;
      }
      this.$store.dispatch(A_SIGNIN_APP, this.form);
    },
  },
  // watch:{
  //   loadingAuth:{
  //     handler(){
  //       this.$store.dispatch(A_FETCH_PROFILE);
  //     }
  //   }
  // }
};
</script>
<style>
.signin-container {
  width: 300px;
  margin: 40px auto;
}
.signin-btn-other {
  flex-wrap: wrap;
  width: 100%;
}
@media screen and (min-width: 540px) {
  .signin-container {
    width: 500px;
  }
  .signin-btn-other {
    width: 50%;
  }
}
@media screen and (min-width: 768px) {
  .signin-container {
    width: 500px;
  }
}
</style>