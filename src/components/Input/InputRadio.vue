<template>
  <div class="mb-3">
    <div>
      <label for="">{{ title }}</label>
    </div>
    <div class="form-check form-check-inline w-100">
        <div class=" w-100 d-flex justify-content-center">
          <div class="mr-4" v-for="(item) in arrRender" :key="item.title">
            <input
              class="form-check-input"
              type="radio"
              :name="name"
              :value="item.value"
              @change="handleChange"
            />
            {{ item.title }}
          </div>
        </div>
    </div>
    <div class="alert alert-danger" v-if="showError">
      {{ errMess }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["name","arrRender", "title","errMess","submit"],
  data() {
      return {
          showError:false,
          error : true,
          value : '',
      }
  },
  methods: {
      handleChange(e){
          this.showError = false;
          this.value=e.target.value;
          this.$emit("event-return-value",this.name,this.value,this.error=false)
      }
  },
  watch:{
      submit(){
          if(!this.value){
            this.showError = true;
          }
      }
  }
};
</script>
<style>
</style>