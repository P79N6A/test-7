<template>
  <div class="operate-pos-table">
    <!-- 表格 -->
    <el-table stripe :data="posTableData" :default-sort="{prop: 'id', order: 'descending'}" @selection-change="onchecked">
      <el-table-column align="center" type="selection" width="60"></el-table-column>
      <el-table-column align="center" label="ID" width="80" prop="id" sortable></el-table-column>
      <el-table-column align="center" label="运营位名称" prop="name" sortable width="200">
        <template scope="scope">
          <el-button type="text" @click.stop="showEditModal('operateConModal', scope.row.id)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="别名" prop="code"></el-table-column>
      <el-table-column label="平台" prop="app_type">
        <template scope="scope">
          {{scope.row.app_type | appTypeText}}
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type">
        <template scope="scope">
          {{scope.row.type | typeText}}
        </template>
      </el-table-column>
      <el-table-column label="数目限制" prop="max_size"></el-table-column>

      <el-table-column align="center" label="状态" width="100" sortable>
        <template scope="scope">
          {{scope.row.status | statusText}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作人" prop="operator" sortable width="140"></el-table-column>
      <el-table-column align="center" label="操作时间" prop="gmt_modified" sortable width="140"></el-table-column>
      <el-table-column align="center" label="操作" width="230">
        <template scope="scope">
          <el-button @click.stop="showEditModal('operateConModal', scope.row.id)">编辑</el-button>
          <el-button @click.stop="setStatusForRow(scope.row.id, scope.row.status)">{{scope.row.status | statusBtnText}}</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination layout="prev, pager, next, total" :total="posTotal" :page-size="posPageSize" :current-page="posCurrentPage" v-show="posTotal > posPageSize" @current-change="loadPosTable"></el-pagination>
  </div>
</template>

<script>
    impport OperateConTable from './OperateContentTable';

    export default {
        name: 'OperatePosTable',
        extends: OperateConTable
    };
</script>
