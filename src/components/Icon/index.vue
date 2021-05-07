<template>
    <span :class="classIcon"></span>
</template>
<script>
export default {
    props:["classIcon"],
}
</script>
<style scoped>
.bi,
.fas,
.fab {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10%;
  cursor: pointer;
}
</style>