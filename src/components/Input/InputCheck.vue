<template>
    <div class="form-check">
      <label class="form-check-label">
        <input type="checkbox" class="form-check-input" :name="name" id="" :value="value" @change="handleChange">
        {{name}}
      </label>
    </div>
</template>
<script>
export default {
    props:["title","name","value"],
    methods:{
        handleChange(e){
            if(e.target.checked){
                this.$emit("event-return-value",this.title,e.target.value,null,this.index);
            }else{
                this.$emit("event-return-value",this.title,"",null,this.index);
            }
        }
    }
}
</script>
<style>
    
</style>