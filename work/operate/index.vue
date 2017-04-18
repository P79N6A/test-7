<template>
    <div class="operate-view">
        <!-- tabs -->
        <el-tabs v-model="activeTab">

            <el-tab-pane name="operatePosTab" label="新运营位管理">

                <!-- 工具条 -->
                <div class="toolbar">
                    <el-button type="primary" @click="showModal('operateConModal')" icon="plus">添加新运营位</el-button>
                    <el-button type="primary" @click="setStatusForChecked('ACTIVE')">激活</el-button>
                    <el-button type="primary" @click="setStatusForChecked('FREEZE')">取消激活</el-button>
                </div>

                <!-- 搜索条 -->
                <searchbar :search="search" search-for="operatePos" @search="doSearch" @reset="resetSearch"></searchbar>

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
                            <el-button @click.stop="setStatusForRow(scope.row.id, scope.row.status)">{{statusBtnText(scope.row.status)}}</el-button>
                        </template>
                    </el-table-column>

                </el-table>

                <!-- 分页 -->
                <el-pagination layout="prev, pager, next, total" :total="posTotal" :page-size="posPageSize" :current-page="posCurrentPage" v-show="posTotal > posPageSize" @current-change="loadPosTable"></el-pagination>

            </el-tab-pane>



            <el-tab-pane name="operateContentTab" label="新运营位内容管理">
                <!-- 工具条 -->
                <div class="toolbar">
                    <el-button type="primary" @click="showModal('operateConModal')" icon="plus">添加内容</el-button>
                    <el-button type="primary" @click="setStatusForChecked('ACTIVE')">激活</el-button>
                    <el-button type="primary" @click="setStatusForChecked('FREEZE')">取消激活</el-button>
                </div>
                <!-- 搜索条 -->
                <searchbar :search="search" @search="doSearch" @reset="resetSearch"></searchbar>

                <!-- 表格 -->
                <el-table stripe :data="tableData" :default-sort="{prop: 'id', order: 'descending'}" @selection-change="onchecked">
                    <el-table-column align="center" type="selection" width="60"></el-table-column>
                    <el-table-column align="center" label="ID" width="80" prop="id" sortable></el-table-column>
                    <el-table-column align="center" label="内容名称" prop="name" sortable width="200">
                        <template scope="scope">
                            <el-button type="text" @click.stop="showEditModal('operateConModal', scope.row.id)">{{scope.row.name}}</el-button>
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
                                        <span class="version-start">
										    >={{ios_item.start.a}}.{{ios_item.start.b}}.{{ios_item.start.c}}
										</span>
                                        <span>&&</span>
                                        <span class="version-end">
										    <={{ios_item.end.a}}.{{ios_item.end.b}}.{{ios_item.end.c}}
										</span>
                                    </p>
                                </div>
                            </div>
                            <div class="version-div andriod-version" v-if="scope.row.condition_obj.android_version">
                                Android版本：
                                <div class="versions">
                                    <p v-for="android_item in scope.row.condition_obj.android_version">
                                        <span class="version-start">
									        >={{android_item.start.a}}.{{android_item.start.b}}.{{android_item.start.c}}
									    </span>
                                        <span>&&</span>
                                        <span class="version-end">
									        <={{android_item.end.a}}.{{android_item.end.b}}.{{android_item.end.c}}
									    </span>
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
                            <el-button @click.stop="showEditModal('operateConModal', scope.row.id)">编辑</el-button>
                            <el-button @click.stop="setStatusForRow(scope.row.id, scope.row.status)">{{statusBtnText(scope.row.status)}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination layout="prev, pager, next, total" :total="total" :page-size="pageSize" :current-page="currentPage" v-show="total > pageSize" @current-change="loadTable"></el-pagination>
            </el-tab-pane>
            <el-tab-pane name="AppCacheTab" label="APP缓存管理">APP缓存管理</el-tab-pane>
        </el-tabs>

        <!-- modals -->
        <operate-content-modal :operate-id="currentRowId" ref="operateConModal" @choose-operate-pos="showModal('operatePosModal')" @choose-itemgroup="showModal('itemgroupModal')" @choose-protocol="showModal('protocolModal')" @reload-table="loadTable()"></operate-content-modal>
        <operate-pos-modal ref="operatePosModal"></operate-pos-modal>
        <itemgroup-modal ref="itemgroupModal"></itemgroup-modal>
        <protocol-modal ref="protocolModal"></protocol-modal>
    </div>
</template>

<script>
import OperateContentModal from './OperateContentModal';
import OperatePosModal from './OperatePosModal';
import ItemgroupModal from './ItemgroupModal';
import ProtocolModal from './ProtocolModal';
import Searchbar from './Searchbar';
import operateMixin from './operateMixin';
import {
    defSearch
} from './operateData';
import {
    successHandler,
    queryStringify,
    getApi,
    loadTableFn
} from './helper';

export default {
    name: 'OperateView',
    mixins: [operateMixin],
    data() {
        return {
            activeTab: 'operatePosTab',
            search: Object.assign({}, defSearch),

            tableData: [], //运营位内容表
            pageSize: 2,
            currentPage: 1,
            total: 10, // 总记录数
            checkedIds: [], // 选择行的id
            currentRowId: '',

            posTableData: [], //运营位表
            posPageSize: 2,
            posCurrentPage: 1,
            posTotal: 10
        };
    },
    computed: {
        pagingData() {
            return {
                offset: (this.currentPage - 1) * this.pageSize,
                count: this.pageSize
            };
        },
        posPagingData() {
            return {
                offset: (this.currentPage - 1) * this.pageSize,
                count: this.pageSize
            };
        }
    },
    methods: {
        showModal(name) {
            this.$refs[name].show(true);
        },
        showEditModal(name, operateId) {
            this.currentRowId = operateId;
            this.showModal(name);
        },
        createOperateContent() { // 添加运营位内容

        },
        resetSearch() {
            this.search = Object.assign({}, defSearch);
        },
        doSearch() {
            this.loadTable();
        },
        statusBtnText(i) {
            const btnTextes = ['激活', '取消激活'];
            return btnTextes[i] || '';
        },
        setStatus(ids, status) {
            const action = status === 'ACTIVE' ? '激活' : '取消激活';
            const data = {
                ids,
                status
            };
            this.axios.post(getApi('/resource/set_data_status.do'), queryStringify(data)).then(successHandler(data => {
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
        },
        loadTable: loadTableFn('/resource/query_data.do')
    },
    components: {
        OperateContentModal,
        OperatePosModal,
        ItemgroupModal,
        ProtocolModal,
        Searchbar
    },
    created() {
        this.loadTable();
    }
}
</script>

<style>
@import '~theme';
.operate-view {
    .searchbar {
        border: 1px solid $color-primary;
        padding: 15px;
        margin: 15px 0;
        .el-form-item {
            margin-bottom: 0;
        }
    }
    .operate-con-img {
        width: 80%;
        margin: 10px 0;
    }
    .version-div {
        display: flex;
        flex-flow: row wrap;
        .versions {
            margin-left: 10px;
        }
    }
    .andriod-version {
        margin-top: 5px;
    }
    .el-pagination {
        margin-top: 15px;
        float: right;
    }
    .dialog-footer.under-pagination {
        clear: both;
        border-top: 1px solid #eee;
        padding: 20px;
        margin-top: 30px;
    }
}
</style>
