<template>
  <Loader v-if="forgetPassLoading" />
  <section v-else>
    <form class="form-email-reset-password">
      <PanelTitle :title="'Vui lòng nhập email để lấy lại mật khẩu'">
        <div class="alert alert-danger" v-if="forgetPassError">
          {{ forgetPassError }}
        </div>
        <div>
          <InputEmail
            :title="'Email'"
            :type="'text'"
            :name="'email'"
            :placeholder="'Email'"
            :submit="submit"
            @event-return-value="handleValue"
            @event-clear-error-change-input ="handleClearError"
          />
          <button class="btn btn-primary" @click.prevent="handleSubmit">
            Gửi
          </button>
          <div>
          Quay lại trang đăng nhập ?
          <router-link exact to="/signin">Đăng nhập</router-link>
        </div>
        </div>
      </PanelTitle>
    </form>
  </section>
</template>
<script>
import InputEmail from "../../../components/Input/InputEmail";
import PanelTitle from "../../../components/Panel/PanelTitle";
import Loader from "../../../components/Loader";
import {
  A_FORGETPASS_CLEAR_ERROR,
  A_FORGETPASS_REQUEST_EMAIL,
} from "../../../store/ForgetPassword/constant";
import { mapGetters } from "vuex";
export default {
  components: {
    InputEmail,
    PanelTitle,
    Loader,
  },
  data() {
    return {
      email: "",
      invalid: true,
      submit: true,
    };
  },
  computed: {
    ...mapGetters(["forgetPassLoading", "forgetPassEmail", "forgetPassError"]),
  },
  methods: {
    handleClearError(){
      this.$store.dispatch(A_FORGETPASS_CLEAR_ERROR);
    },
    handleValue(name, value, invalidInput) {
      switch (name) {
        case "email":
          this.email = value;
          this.invalid = invalidInput;
          break;
      }
    },
    handleSubmit() {
      this.submit = !this.submit;
      if (this.invalid) {
        return;
      }
      this.$store.dispatch(A_FORGETPASS_REQUEST_EMAIL, this.email);
    },
  },
  watch: {
    forgetPassError() {
      if (this.forgetPassError) {
        this.email = "";
        this.invalid =  true;
      }
    },
  },
};
</script>
<style>
.form-email-reset-password{
  width: 300px;
  margin: 40px auto;
}
@media screen and (min-width: 540px) {
  .form-email-reset-password{
    width: 500px;
  }
}
@media screen and (min-width: 768px) {
  .form-email-reset-password{
    width: 500px;
  }
}
</style>