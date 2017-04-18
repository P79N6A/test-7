<template>
  <div class="operate-con-table">

    <el-table stripe :data="tableData" :default-sort="{prop: 'id', order: 'descending'}" @selection-change="onchecked">

      <el-table-column align="center" type="selection" width="60"></el-table-column>

      <el-table-column align="center" label="ID" width="80" prop="id" sortable></el-table-column>

      <el-table-column align="center" label="内容名称" prop="name" sortable width="200">
        <template scope="scope">
          <el-button type="text" @click.stop="showEditModal(scope.row.id)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="内容">
        <template scope="scope">
          <img class="operate-con-img" :src="scope.row.image_url" v-show="scope.row.image_url" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="版本号">
        <template scope="scope">
          <div class="version-div ios-version" v-if="scope.row.condition_obj.ios_version">
            IOS版本：
            <div class="versions">
              <p v-for="ios_item in scope.row.condition_obj.ios_version">
                <span class="version-start"> >={{ios_item.start.a}}.{{ios_item.start.b}}.{{ios_item.start.c}} </span>
                <span>&&</span>
                <span class="version-end"> <={{ios_item.end.a}}.{{ios_item.end.b}}.{{ios_item.end.c}} </span>
              </p>
            </div>
          </div>
          <div class="version-div andriod-version" v-if="scope.row.condition_obj.android_version">
            Android版本：
            <div class="versions">
              <p v-for="android_item in scope.row.condition_obj.android_version">
                <span class="version-start"> >={{android_item.start.a}}.{{android_item.start.b}}.{{android_item.start.c}} </span>
                <span>&&</span>
                <span class="version-end"> <={{android_item.end.a}}.{{android_item.end.b}}.{{android_item.end.c}} </span>
              </p>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序" prop="weight" width="100" sortable></el-table-column>

      <el-table-column align="center" label="运营位">
        <template scope="scope">
          {{scope.row.resource_type | typeText}}{{scope.row.resource_id}}：{{scope.row.resource_name}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="持续时间" width="200">
        <template scope="scope">
          <p>{{scope.row.start_time}}</p>
          <p>{{scope.row.end_time}}</p>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100" sortable>
        <template scope="scope">
          {{scope.row.status | statusText}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作人" prop="operator" sortable width="140"></el-table-column>

      <el-table-column align="center" label="操作" width="230">
        <template scope="scope">
          <el-button @click.stop="showEditModal(scope.row.id)">编辑</el-button>
          <el-button @click.stop="setStatusForRow(scope.row.id, scope.row.status)">{{scope.row.status | statusBtnText}}</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination layout="prev, pager, next, total" :total="total" :page-size="pageSize" :current-page="currentPage" v-show="total > pageSize" @current-change="loadTable"></el-pagination>

  </div>
</template>

<script>
  import {
    successHandler,
    queryStringify,
    getApi,
    loadTableFn
  } from './helper';
  import operateMixin from './operateMixin';

  export default {
    name: 'OperateConTable',
    mixins: [operateMixin],
    props: {
      dataApi: String,
      statusApi: String,
      search: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    data() {
      return {
        tableData: [],
        pageSize: 2,
        currentPage: 1,
        total: 10, // 总记录数
        checkedIds: [], // 选择行的id
        currentRowId: ''
      }
    },
    computed: {
      pagingData() {
        return {
          offset: (this.currentPage - 1) * this.pageSize,
          count: this.pageSize
        };
      }
    },
    methods: {
      showEditModal(id) {
        this.$emit('show-edit-modal', id);
      },
      loadTable(...args) {
        const loadData = loadTableFn(this.dataApi);
        loadData.apply(this, args);
      },
      setStatus(ids, status) {
        const action = status === 'ACTIVE' ? '激活' : '取消激活';
        const data = {
          ids,
          status
        };
        this.axios.post(getApi(this.statusApi), queryStringify(data)).then(successHandler(data => {
          // reload table
          this.loadTable();
        }, `${action}成功`));
      },
      onchecked(checkeds) {
        this.checkedIds = checkeds.map(checked => checked.id);
      },
      setStatusForChecked(status) {
        if (!this.checkedIds.length) {
          this.$message.warning('请至少选择一条数据..');
        } else {
          this.setStatus(this.checkedIds, status);
        }
      },
      setStatusForRow(id, i) {
        const statuses = ['ACTIVE', 'FREEZE'];
        const targetStatus = statuses[i];
        this.setStatus([id], targetStatus);
      }
    },
    created() {
      this.loadTable();
    }
  }
</script>
