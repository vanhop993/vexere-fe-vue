<template>
  <div class="collapse-item" :class="plusClass">
    <slot name="collapse-item"></slot>
  </div>
</template>

<script>
export default {
  props: ["item","plusClass"],
};
</script>

<style>
.collapse-item{
    padding: 8px 16px;
}
</style>