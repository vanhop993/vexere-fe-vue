<template>
  <div class="position-relative container-hotline">
    <a class="text-decoration-none btn" @click="handlehotline">
      <div class="d-flex align-items-center">
        <i class="fas fa-phone-alt mr-1"></i>
        <span>hotline</span>
      </div>
    </a>
    <div class="header-hotline" :class="{ dnone: toggleHotline }">
      <a class="text-decoration-none" href="tel:1900 888684"><span style="color: rgb(0, 96, 196);">1900 888684 - </span></a>Để đặt vé qua điện thoại <br /><a class="text-decoration-none" href="tel:1900 888843"><span style="color: rgb(0, 96, 196);">1900 888843 - </span></a>Để được hướng
      dẫn cách đặt vé online <br />
      <a class="text-decoration-none" href="tel:1900 969681"><span style="color: rgb(0, 96, 196);">1900 969681 - </span></a>Để phản hồi về dịch vụ và xử lý sự cố
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggleHotline: true,
    };
  },
  methods: {
    handlehotline() {
      this.toggleHotline = !this.toggleHotline;
    },
  },
  mounted() {
      window.addEventListener("click",(e)=>{
        if(!document.querySelector(".container-hotline").contains(e.target)){
            this.toggleHotline = true;
        }
      })
  },
};
</script>
<style scoped>
.btn {
  border: 1px solid black;
}
.header-hotline {
  width: 450px;
  padding: 10px;
  position: absolute;
  top: 125%;
  right:0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 4px 16px rgb(20 23 28 / 50%);
}
.header-hotline::before{
    position: absolute;
    top: -8%;
    right: 5%;
    z-index: 2;
    content: '';
    border-width: 0 10px 13px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
}
.dnone{
  display: none;
}
</style>