<template>
  <div class="w-100 border-part mb-3">
    <div
      class="d-flex justify-content-start align-items-center bg-primary border-top"
    >
      <span class="p-3 text-white">{{title}}</span>
    </div>
    <div class="p-2 border-bottom bg-white">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props:["title"],
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