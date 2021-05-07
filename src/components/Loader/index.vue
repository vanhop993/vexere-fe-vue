<template>
<div class="loader-container w-100">
  <div class="loader"></div>
</div>
</template>

<script>
export default {};
</script>

<style>
.loader-container{
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right:0;
}
.loader {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
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
    transform: translate(-50%,-50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%,-50%) rotate(360deg);
  }
}
</style>
