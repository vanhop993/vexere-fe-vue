<template>
  <div class="form-group">
    <label for="">{{ title }}</label>
    <input
      :type="type"
      :name="name"
      class="form-control"
      :placeholder="placeholder"
      v-model="v$.value.$model"
      @blur="handleBlur"
      @input="handleInput"
    />
    <div class="alert alert-danger" v-if="v$.value.$errors[0]">
      {{ v$.value.$errors[0]?.$message }}
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/reactivity";
import { required, helpers ,email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["title", "type", "name", "placeholder", "submit" ,"checkErr","messErr"],
  setup(props, { emit }) {
    const valueInput = reactive({ value: "" });
    const rules = {
      value: {
        required: helpers.withMessage(
          `${props.title} không được để trống`,
          required
        ),
        email: helpers.withMessage(
          "Trường nhập vào phải là email",
          email
        ),
      },
    };
    const v$ = useVuelidate(rules, valueInput);
    const handleBlur = () => {
      v$.value.$touch();
      emit("event-return-value", props.name, valueInput.value,v$.value.$invalid);
    };
    const handleSubmit = () => {
      v$.value.$touch();
    };
    const handleInput = () => {
      emit("event-clear-error-change-input");
    }
    return {
      valueInput,
      v$,
      handleBlur,
      handleSubmit,
      handleInput
    };
  },
  watch:{
      submit(){
          this.handleSubmit()
      },
      checkErr(){
        this.v$.value.$errors.push({$message:this.messErr});
      }
  }
};
</script>
<style>
</style>