<template>
  <li class="select-item">
    <a @mousedown.prevent="trigger(option)">
      {{ option.text }}
      <span class="glyphicon glyphicon-ok check-mark" v-show="option.selected"></span>
    </a>
  </li>
</template>

<script>
  export default {
    props: {
      option: {
        type: Object
      }
    },
    methods: {
      trigger(option) {
        this.$dispatch('selectoption', option)
      }
    }
  }
</script>

<style scoped>
  .check-mark{
    position: absolute;
    display: inline-block;
    right: 15px;
    margin-top: 5px;
  }

</style>