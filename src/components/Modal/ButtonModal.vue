<template>
  <button
    type="button"
    class="btn"
    :class="classBtnModal"
    data-toggle="modal"
    data-target="#exampleModal"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
    props:["classBtnModal"]
};
</script>
<style lang="">
</style>