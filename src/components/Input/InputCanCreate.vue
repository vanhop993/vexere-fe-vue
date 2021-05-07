<template>
  <div class="form-group pt-2">
    <div class="d-flex justify-content-between">
      <label for="">{{ label }}</label>
      <div
        class="btn btn-primary btn-add-input"
        @click.prevent="handleAddInput"
      >
        {{ titleBtn }}
      </div>
    </div>
    <div
      class="d-flex justify-content-lg-between align-items-center w-100"
      v-for="(input, index) in inputs"
      :key="index"
    >
      <Input
        :index="index"
        :checkSubmit="checkSubmit"
        :title="title"
        :min="min"
        :max="max"
        :value="value[index]"
        @event-return-value="handleChange"
      />
      {{index}}
      <span
        class="far fa-times-circle m-1 btn"
        @click.prevent="handleDestroy(index)"
      ></span>
    </div>
  </div>
</template>

<script>
// import { reactive } from "@vue/reactivity";
import Input from "./Input";

export default {
  components: { Input },
  props: ["label", "title", "titleBtn", "location", "checkSubmit","min","max","value"],
  data(){
    return {
      inputs : [""],
      invalid : [true],
    }
  },
  methods:{
    handleAddInput () {
      this.inputs.push("");
      this.invalid.push(true);
    },
    handleDestroy  (index) {
      if (this.inputs.length > 1) {
        this.inputs.splice(index, 1);
        this.handleChange();
      }
    },
    handleChange (name , value, invalidItem , index )  {
      this.inputs[index] = value;
      this.invalid[index] = invalidItem;
      this.$emit(`event-value`,this.title , this.inputs, this.invalid, this.location);
    },
  },
  watch:{
    value:{
      handler(val){
        if(val){
          this.inputs = val;
        }else{
          this.inputs = [""];
        }
      }
    }
  },
  mounted(){
    if(this.value){
      this.inputs = this.value;
    }
  }
};
</script>

<style>
</style>