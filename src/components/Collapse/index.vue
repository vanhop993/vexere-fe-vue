<template>
  <div>
    <a
      class="collapse-plus d-block text-decoration-none"
      :class="plusClass"
      data-toggle="collapse"
      :href="'#' + title"
      aria-expanded="false"
      aria-controls="contentId"
    >
      <slot name="collapseTitle"></slot>
    </a>
    <div class="collapse collapse-menu" :id="title">
      <slot name="collapseItems"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objToggle:{
        toggle:false,
        title:''
      },
    }
  },
  props: ["title","plusClass"],
};
</script>
<style>
.collapse-menu{
  padding-left: 2%;
  background-color: #25282c;
}

.collapse-plus {
  padding: 8px 16px;
  margin-bottom: 0.2px;
  border-radius: 0.25rem;
  color: #c2c7d0;
}

.collapse-plus:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>