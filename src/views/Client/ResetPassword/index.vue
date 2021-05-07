<template>
  <Loader v-if="forgetPassLoading" />
  <section v-else class="form-container-reset-password">
    <form>
      <PanelTitle :title="'Reset password'">
        <Input
          :title="'Password'"
          :type="'password'"
          :name="'password'"
          :min="8"
          :max="20"
          :placeholder="'Nhập password mới'"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <Input
          :title="'Nhập lại password'"
          :type="'password'"
          :name="'rePassword'"
          :min="8"
          :max="20"
          :checkErr="errRePassword"
          :messErr="'Password không trùng khớp'"
          :placeholder="'Nhập lại password'"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <button class="btn btn-warning w-100" @click.prevent="handleSubmit">
          Reset password
        </button>
      </PanelTitle>
    </form>
  </section>
</template>
<script>
import PanelTitle from "../../../components/Panel/PanelTitle";
import Loader from "../../../components/Loader";
import Input from "../../../components/Input/Input";
import { mapGetters } from "vuex";
import { A_FORGETPASS_RESET_PASSWORD } from "../../../store/ForgetPassword/constant";
export default {
  data() {
    return {
      password: "",
      invalid: {
        password: true,
        rePassword: true,
      },
      submit: false,
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
    handleValue(name, value, invalid) {
      if (name === "rePassword" && this.password !== value) {
        this.invalid[name] = true;
        this.errRePassword = !this.errRePassword;
        return;
      } else {
        this.invalid[name] = invalid;
      }
      if (name === "password") {
        this.password = value;
        this.invalid.password = invalid;
      }
    },
    handleSubmit() {
      this.submit = !this.submit;
      console.log(this.invalid);
      for (let item in this.invalid) {
        if (this.invalid[item]) return;
      }
      const { email, secretToken } = this.$route.params;
      const objPayload = {
        email,
        secretToken,
        password: this.password,
      };
      this.$store.dispatch(A_FORGETPASS_RESET_PASSWORD, objPayload);
    },
  },
};
</script>
<style scoped>
.form-container-reset-password {
  width: 300px;
  margin: 40px auto;
}
@media screen and (max-width: 540px) {
  .form-container-reset-password {
    width: 500px;
  }
}
@media screen and (min-width: 768px) {
  .form-container-reset-password {
    width: 500px;
  }
}
</style>