<template>
  <div class="toolbar">
      <el-button type="primary" @click="$emit('create-modal')" icon="plus">添加内容</el-button>
      <el-button type="primary" @click="$emit('activate-checked')">激活</el-button>
      <el-button type="primary" @click="$emit('deactivate-checked')">取消激活</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Toolbar',
    props: {
      createBtnText: String
    }
  }
</script>