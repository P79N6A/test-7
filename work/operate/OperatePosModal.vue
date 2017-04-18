<template>
  <div class="operate-pos-modal">
	<el-dialog title="选择运营位" v-model="visible">

	  <searchbar :search="search" search-for="operatePos" @search="doSearch" @reset="resetSearch"></searchbar>

	  <el-table stripe :data="tableData" v-if="tableData.length">
		<el-table-column align="center" label="ID" sortable prop="id" width="80"></el-table-column>
		<el-table-column align="center" label="运营位名称" sortable prop="name">
		  <template scope="scope">
			<el-button type="text" @click.stop="selectOperatePos(scope.row)">{{scope.row.name}}</el-button>
		  </template>
		</el-table-column>
		<el-table-column align="center" label="别名" sortable prop="code"></el-table-column>
		<el-table-column align="center" label="平台"  width="80">
		  <template scope="scope">
			{{scope.row.app_type | appTypeText}}
		  </template>
		</el-table-column>
		<el-table-column align="center" label="类型" sortable width="100">
		  <template scope="scope">
			{{scope.row.type | typeText}}
		  </template>
		</el-table-column>
		<el-table-column align="center" label="数目限制" required prop="max_size" width="100">
		  <template scope="scope">
			{{scope.row.max_size}}
		  </template>
		</el-table-column>
		<el-table-column align="center" label="状态" sortable prop="status" width="100">
		  <template scope="scope">
			{{scope.row.status | statusText}}
		  </template>
		</el-table-column>
		<el-table-column align="center" label="操作人" prop="operator"></el-table-column>
		<el-table-column align="center" label="操作时间" prop="gmt_modified"></el-table-column>
	  </el-table>

	  <el-pagination layout="prev, pager, next, total" :total="total" :page-size="pageSize" :current-page="currentPage" v-show="total > pageSize" @current-change="loadTable"></el-pagination>
	  
	  <div class="dialog-footer under-pagination" slot="footer">
		<el-button @click="show(false)">取消</el-button>
	  </div>
	</el-dialog>
  </div>
</template>

<script>
  import Searchbar from './Searchbar';
  import operateMixin from './operateMixin';
  import {deepClone, defPosSearch} from './operateData';
  import {loadTableFn, bus} from './helper';

  export default {
	name: 'OperatePosModal',
	mixins: [operateMixin],
	data() {
	  return {
		search: deepClone(defPosSearch),
		visible: false,
		tableData: [],
		pageSize: 10, // 每页10个
		currentPage: 1, //页码
		total: 10 // 总记录数
	  };
	},
	computed: {
	  pagingData() {
		return {offset: (this.currentPage - 1) * this.pageSize, count: this.pageSize};
	  }
	},
	methods: {
	  show(isShow) {
		this.visible = isShow;
	  },
	  doSearch() {
		this.loadTable();
	  },
	  resetSearch() {
		this.search = deepClone(defPosSearch);
	  },
      selectOperatePos(row) {
        bus.$emit('select-operate-pos', row);
        this.show(false);
      },
	  loadTable: loadTableFn('/resource/query_info.do')
	},
	components: {
	  Searchbar
	},
	created() {
	  this.loadTable();
	}
  }
</script>

<style>
  .operate-pos-modal {
	.searchbar {
	  padding-bottom: 25px;
	  .el-form-item{
		margin-top:10px
	  }
	}

	.form-item-btns{
	  margin-left: 35px;
	  .el-button+.el-button {
		margin-left: 20px;
	  }
	}
  }
</style>