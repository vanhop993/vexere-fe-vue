<template>
  <div class="m-1">
    <label>
      <input
        type="radio"
        :value="data"
        class="radioInput"
        @click="handleRadio"
      />
      <img :src="data" :alt="data" class="img" :class="{ select: select }" />
    </label>
  </div>
</template>
<script>
export default {
    props:["title","data","index","selectProps","name"],
    data(){
        return{
            select:false,
        }
    },
    methods: {
        handleRadio(e){
            this.select=!this.select;
            let valueReturn = null;
            if(this.select){
                valueReturn=e.target.value;
            }else{
                valueReturn="";
            }
            let invalid = false;
            this.$emit("event-return-value",this.title,valueReturn,invalid,this.index)
        }
    },
    mounted() {
        if(this.selectProps){
            this.select = this.selectProps
        }
    },
};
</script>
<style scoped>
.select{
    border: 5px solid #a0d5fe;
}
.img{
    width: 150px;
    height: 150px;
}
.radioInput[type="radio"]{
    display: none;
}
/* [type=radio] + img {
  cursor: pointer;
}

/* CHECKED STYLES */
/* [type=radio]:checked + img {
  outline: 4px solid #69a4d1;
}  */
</style>