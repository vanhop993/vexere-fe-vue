<template>
<div>
  <div class="signup-container py-3">
    <PanelTitle :title="'Đăng ký'">
      <form action="" @submit.prevent="handleSubmit">
        <Input
          :type="'text'"
          :title="'Họ và tên'"
          :name="'name'"
          :placeholder="'Họ và tên'"
          :min="0"
          :max="100"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <Input
          :type="'text'"
          :title="'Username'"
          :name="'username'"
          :placeholder="'Username'"
          :min="0"
          :max="100"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <Input
          :type="'password'"
          :title="'Password'"
          :name="'password'"
          :placeholder="'Password'"
          :min="8"
          :max="16"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <Input
          :type="'password'"
          :title="'Nhập lại password'"
          :name="'rePassword'"
          :placeholder="'Re-Password'"
          :min="8"
          :max="16"
          :submit="submit"
          :checkErr="errRePassword"
          :messErr="'Password không trùng khớp'"
          @event-return-value="handleValue"
        />
        <InputEmail
          :title="'Email'"
          :name="'email'"
          :placeholder="'Email'"
          :min="0"
          :max="100"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <Input
          :title="'Số điện thoại'"
          :name="'phone'"
          :placeholder="'Phone'"
          :min="0"
          :max="100"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <InputRadio
            :name="'gender'"
          :arrRender="[
            { title: 'nam', value: 'nam' },
            { title: 'nữ', value: 'nữ' },
          ]"
          :title="'Giới tính'"
          :errMess="'Vui lòng chọn giới tính'"
          :submit="submit"
          @event-return-value="handleValue"
        />
        <button class="btn btn-success w-100">Đăng ký</button>
        <div>
          Bạn đã có tài khoản ?
          <router-link exact to="/signin">Đăng nhập</router-link>
        </div>
      </form>
    </PanelTitle>
  </div>
  </div>
</template>
<script>
import PanelTitle from "../../../components/Panel/PanelTitle";
import Input from "../../../components/Input/Input";
import InputRadio from "../../../components/Input/InputRadio";
import api from "../../../api";
import router from "../../../router";
import InputEmail from "../../../components/Input/InputEmail";
export default {
  data() {
    return {
      submit: false,
      checkErr: false,
      form: {
        name: "",
        username: "",
        password: "",
        rePassword: "",
        phone: "",
        gender:""
      },
      invalid: {
        name: true,
        username: true,
        password: true,
        rePassword: true,
        phone: true,
        gender:true
      },
    };
  },
  components: {
    PanelTitle,
    Input,
    InputRadio,
    InputEmail
  },
  methods: {
    handleValue(name, value, invalid) {
      if (name === "rePassword") {
        if (this.form.password !== value) {
          this.errRePassword = !this.errRePassword;
          this.invalid[name] = true;
          return;
        }
      }
      this.form[name] = value;
      this.invalid[name] = invalid;
    },
    handleSubmit() {
      this.submit = !this.submit;
      const arrInvalid = Object.values(this.invalid);
      for(let item of arrInvalid) {
          if(item) return
      }
      delete this.form.rePassword;
      api.post("/signup",this.form).then(() => {
        router.replace('/signin')
      }).catch((err) => {
        alert(err.response.data.message)
      })
    },
  },
};
</script>
<style>
.signup-container {
  margin: 40px auto;
  width: 300px;
}

.signup-btn-other {
    flex-wrap: wrap;
    width: 100%;
  }
@media screen and (min-width: 540px) {
  .signup-container {
    width: 500px;
  }
  .signup-btn-other {
  width: 50%;
}
}
@media screen and (min-width: 768px) {
  .signup-container{
    margin: 40px auto;
  }
}
</style>