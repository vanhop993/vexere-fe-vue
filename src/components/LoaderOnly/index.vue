<template>
  <div class="loaderOnly"></div>
</template>
<script>
export default {};
</script>
<style scoped>
.loaderOnly {
    /* position: absolute;
    top: 50%;
    left:50%; */
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border-top: 4px solid #3498db;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: translate(-50%,-50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%,-50%) rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform:rotate(0deg);
  }
  100% {
    transform:rotate(360deg);
  }
}
</style>