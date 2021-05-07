<template>
  <div class="form-group w-100">
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
import { required, helpers, maxLength, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["title", "type", "name", "placeholder", "min", "max","submit" ,"checkErr","messErr","index","value"],
  setup(props, { emit }) {
    const valueInput = reactive({ value: "" });
    const rules = {
      value: {
        required: helpers.withMessage(
          `${props.title} không được để trống`,
          required
        ),
        minLength: helpers.withMessage(
          ({ $params }) =>
            `${props.title} phải có ít nhất ${$params.min} ký tự`,
          minLength(props.min)
        ),
        maxLength: helpers.withMessage(
          ({ $params }) => `${props.title} không được quá ${$params.max} ký tự`,
          maxLength(props.max)
        ),
      },
    };
    const v$ = useVuelidate(rules, valueInput);
    const handleBlur = () => {
      v$.value.$touch();
      emit("event-return-value", props.name, valueInput.value,v$.value.$invalid,props.index);
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
      },
      value:{
        handler(val){
          if(val){
            this.v$.value.$model = val;
          }else{
            this.v$.value.$model = "";
            this.v$.$dirty=true;
          }
        }
      }
  },
  mounted() {
    if(this.value){
      this.v$.value.$model = this.value;
    }
  },
};
</script>
<style>
</style>