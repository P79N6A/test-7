<template>
  <div class="protocols-modal">
    <el-table :data="protocols" stripe>
      <el-table-column label="伪协议名称" prop="name" sortable></el-table-column>
      <el-table-column label="伪协议别名" prop="code" sortable></el-table-column>
      <el-table-column label="协议" prop="protocol"></el-table-column>
      <el-table-column label="参数" prop="param_list"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </el-table>

    <el-pagination :total="total" layout="prev,pager,next, total"></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'ProtocolsModal',
    props: ['protocols']
  };
</script>