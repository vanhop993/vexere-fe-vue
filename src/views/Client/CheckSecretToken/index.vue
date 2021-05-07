<template>
  <Loader v-if="forgetPassLoading" />
  <form class="form-check-secret-token" v-else>
    <PanelTitle :title="'Nhập mã bảo mật'">
      <div class="alert alert-danger my-2" v-if="forgetPassError">
        {{ forgetPassError }}
      </div>
      <div>
        <Input
          :title="'Mã bảo mật'"
          :type="'text'"
          :name="'secretCode'"
          :min="0"
          :max="100"
          :placeholder="'Mã reset password'"
          :submit="submit"
          @event-return-value="handleValue"
          @event-clear-error-change-input ="handleClearError"
        />
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-sm-6 mb-1">
              <button
                class="btn btn-primary w-100"
                @click.prevent="handleResetPassword"
              >
                Reset password
              </button>
            </div>
            <div class="col-12 col-sm-6 mb-1">
              <button
                class="btn btn-info w-100"
                @click.prevent="handleSendSecretCode"
              >
                Gửi lại mã bảo mật
              </button>
            </div>
          </div>
        </div>
      </div>
    </PanelTitle>
  </form>
</template>
<script>
import PanelTitle from "../../../components/Panel/PanelTitle";
import Loader from "../../../components/Loader";
import Input from "../../../components/Input/Input";
import { mapGetters } from "vuex";
import {
  A_FORGETPASS_CLEAR_ERROR,
  A_FORGETPASS_REQUEST_EMAIL,
  A_FORGETPASS_REQUEST_SECRET_TOKEN,
} from "../../../store/ForgetPassword/constant";
export default {
  data() {
    return {
      secretCode: "",
      invalid: true,
      submit: true,
    };
  },
  components: {
    PanelTitle,
    Loader,
    Input,
  },
  computed: {
    ...mapGetters(["forgetPassLoading", "forgetPassEmail", "forgetPassError"]),
  },
  methods: {
    handleValue(name, value, invalidInput) {
      switch (name) {
        case "secretCode":
          this.secretCode = value;
          this.invalid = invalidInput;
          break;
      }
    },
    handleSendSecretCode() {
      const { email } = this.$route.params;
      this.$store.dispatch(A_FORGETPASS_REQUEST_EMAIL, email);
    },
    handleResetPassword() {
      this.submit = !this.submit;
      if (this.invalid) return;
      const { email } = this.$route.params;
      const objPayload = {
        email,
        secretToken: this.secretCode,
      };
      this.$store.dispatch(A_FORGETPASS_REQUEST_SECRET_TOKEN, objPayload);
    },
      handleClearError(){
      this.$store.dispatch(A_FORGETPASS_CLEAR_ERROR);
    },
  },
  watch: {
    forgetPassError() {
      if (this.forgetPassError) {
        this.secretCode = "";
        this.invalid = true;
      }
    },
  },
};
</script>
<style>
.form-check-secret-token {
  width: 300px;
  margin: 40px auto;
}
@media screen and (min-width: 540px) {
  .form-check-secret-token {
    width: 500px;
  }
}
@media screen and (min-width: 768px) {
  .form-check-secret-token {
    width: 500px;
  }
}
</style>