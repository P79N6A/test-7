<template>
  <div class="operate-pos-modal">
    <searchbar :search="search" search-for="operatePos" @search="doSearch" @reset="resetSearch"></searchbar>

    <el-table stripe>
      <el-table-column label="ID" sortable prop="id"></el-table-column>
      <el-table-column label="运营位名称" sortable prop="name">
        <template scope="scope">
          <el-button type="text" @click.stop="selectOpLayout(scope.row.id, scope.row.name, scope.row.type, scope.row.app_type)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="别名" sortable prop="code"></el-table-column>
      <el-table-column label="平台">
        <tempalte scope="scope">
          {{scope.row.app_type | appTypeText}}
        </tempalte>
      </el-table-column>
      <el-table-column label="类型">
        <tempalte scope="scope">
          {{scope.row.type | typeText}}
        </tempalte>
      </el-table-column>
      <el-table-column label="数目限制" required prop="item.max_size">
      </el-table-column>
      <el-table-column label="状态" sortable prop="status">
        <template scope="scope">
          {{scope.row.status | statusText}}
        </template>
      </el-table-column>
      <el-table-column label="操作人" prop="operator"></el-table-column>
      <el-table-column label="操作时间" prop="gmt_modified"></el-table-column>
    </el-table>

    <el-pagination :total="total" layout="prev, pager, next, total"></el-pagination>
  </div>
</template>

<script>
  import {deepClone, defSearch} from './operateData';

  export default {
    name: 'OperatePosModal',
    data: {
      search: deepClone(defSearch);
    },
    methods: {
      dosearch() {

      },
      resetSearch() {
        this.search = deepClone(defSearch);
      }
    }
  }
</script>