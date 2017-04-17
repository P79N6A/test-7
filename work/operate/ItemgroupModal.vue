<template>
  <div class="itemgroup-modal">
    <div class="searchbar">
      <el-form inline>
        <el-form-item label="商品组ID:">
          <el-input v-model="searchId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="groupSearch">查询</el-button>
          <el-button type="primary" @click="searchReset">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="data" stripe>
      <el-table-column label="商品组名称" prop="item_group_info.name">
        <template scope="scope">
          <el-button type="text" @click.stop="selectItemGroup(scope.row)">{{scope.row.item_group_info.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="商品组ID" prop="item_group_info.id">
        <template scope="scope">
          {{scope.row.item_group_info.id}}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :total="total" layout="prev, pager, next, total"></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'ItemgroupModal',
    props: []
  };
</script>