<template>
  <div class="add-company-border-top pt-2">
    <div class="d-flex align-items-center justify-content-between my-2">
      <label for="">{{ label }}</label>
      <button class="btn btn-primary" @click.prevent="handleMorePanel">
        more
      </button>
    </div>
    <div class="mx-4" v-for="(item, index) in arrayRender" :key="index">
      <Panel @event-close="handleClosePanel(index)">
        <slot :index="index"></slot>
      </Panel>
    </div>
  </div>
</template>

<script>
import Panel from "./Panel";
export default {
  props: ["label","title","arrayRender","location"],
  components: {
    Panel,
  },
  setup(props,{emit}) {
    const handleMorePanel = () => {
        emit("event-more-panel",props.title,true,props.location);
    };
    const handleClosePanel = (index) => {
      if (props.arrayRender.length > 1) {
        emit("event-close-panel",props.title,false,index);
      }
    };
    return {handleMorePanel, handleClosePanel };
  },
};
</script>

<style>
</style>