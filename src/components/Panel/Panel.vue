<template>
  <div class="w-100 border-part mb-3">
    <div
      class="d-flex justify-content-end align-items-center bg-primary border-top"
    >
      <span
        class="far fa-times-circle m-1 btn"
        @click="handleClose"
      ></span>
    </div>
    <div class="p-2 border-bottom">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
      handleClose(){
          this.$emit("event-close");
      }
  },
};
</script>

<style>
.border-top {
  border-radius: 10px 10px 0 0;
}
.border-bottom {
  border: 3px solid #ecf0f5;
  border-radius: 0 0 10px 10px;
}
</style>