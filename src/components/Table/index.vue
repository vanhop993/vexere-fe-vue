<template>
  <table class="table">
      <thead>
          <tr>
              <th v-for="th in thList" :key="th">{{th}}</th>
          </tr>
      </thead>
      <tbody>
          <slot></slot>
      </tbody>
  </table>
</template>

<script>
export default {
    props:{
        thList:Array,
    }
}
</script>

<style>

</style>