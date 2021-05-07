<template>
  <div class="card-thong-tin-chi-tiet">
      <BootstrapTabs :data="data"/>
  </div>
</template>
<script>
import BootstrapTabs from "../../components/BootstrapTabs";
import { A_GET_COMPANY } from "../../store/Company/constant";
export default {
    props:["data"],
    components:{
        BootstrapTabs
    },
    mounted() {
        this.$store.dispatch(A_GET_COMPANY,this.data.company._id);
    },
};
</script>
<style scoped>
.card-thong-tin-chi-tiet {
  margin-top: 16px;
  border-top: 1px solid rgb(192, 192, 192);
  padding: 12px 64px 0px;
}
</style>