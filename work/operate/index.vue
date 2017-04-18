<template>
    <div class="operate-view">
        <!-- tabs -->
        <el-tabs v-model="activeTab">

            <el-tab-pane name="operatePosTab" label="新运营位管理">

                <!-- 工具条 -->
                <toolbar @create-modal="showModal('operatePosModal')" @activate-checked="setStatusForChecked('ACTIVE')" @deactivate-checked="setStatusForChecked('FREEZE')"></toolbar>

                <!-- 搜索条 -->
                <searchbar :search="search" search-for="operatePos" @search="doSearch" @reset="resetSearch"></searchbar>
                
                <!-- 表格 -->
                <operate-pos-table data-api="/resource/query_data.do" status-api="/resource/set_data_status.do" :search="posSearch" @show-edit-modal="showEditModal('operatePosModal', $event)" ref="operatePosTbl"></operate-pos-table>

            </el-tab-pane>



            <el-tab-pane name="operateConTab" label="新运营位内容管理">
                <!-- 工具条 -->
                <toolbar @create-modal="showModal('operateConModal')" @activate-checked="setStatusForChecked('ACTIVE')" @deactivate-checked="setStatusForChecked('FREEZE')"></toolbar>

                <!-- 搜索条 -->
                <searchbar :search="search" @search="doSearch" @reset="resetSearch"></searchbar>

                <!-- 表格 -->
                <operate-con-table data-api="/resource/query_data.do" status-api="/resource/set_data_status.do" :search="search" @show-edit-modal="showEditModal('operateConModal', $event)"  ref="operateConTbl"></operate-con-table>

            </el-tab-pane>
            <el-tab-pane name="AppCacheTab" label="APP缓存管理">
                APP缓存管理
            </el-tab-pane>
        </el-tabs>

        <!-- modals -->
        <operate-content-modal :operate-id="currentRowId" ref="operateConModal" @choose-operate-pos="showModal('operatePosSelectModal')" @choose-itemgroup="showModal('itemgroupModal')" @choose-protocol="showModal('protocolModal')" @reload-table="loadTable()"></operate-content-modal>

        <operate-pos-select-modal ref="operatePosSelectModal"></operate-pos-select-modal>
        
        <itemgroup-modal ref="itemgroupModal"></itemgroup-modal>
        
        <protocol-modal ref="protocolModal"></protocol-modal>
        
        <operate-position-modal :operate-id="posCurrentRowId" ref="operatePosModal" @reload-table="loadTable()"></operate-position-modal>
    </div>
</template>

<script>
import OperateContentModal from './OperateContentModal';
import OperatePositionModal from './OperatePositionModal';
import OperatePosSelectModal from './OperatePosSelectModal';
import ItemgroupModal from './ItemgroupModal';
import ProtocolModal from './ProtocolModal';

import OperatePosTable from './OperatePositionTable';
import OperateConTable from './OperateContentTable';

import Toolbar from './Toolbar';
import Searchbar from './Searchbar';

import {
    defSearch, defPosSearch
} from './operateData';

export default {
    name: 'OperateView',
    data() {
        return {
            activeTab: 'operatePosTab',

            search: Object.assign({}, defSearch),
            posSearch: Object.assign({}, defPosSearch),

            currentRowId: '',
            posCurrentRowId: ''
        };
    },
    computed: {
        isOperatePos() {
            return this.activeTab === 'operatePosTab';
        }
    },
    methods: {
        showModal(name) {
            this.$refs[name].show(true);
        },
        showEditModal(operateId, name) {
            const idkey = name === 'operateConModal' ? 'currentRowId' : 'posCurrentRowId';
            this[idkey] = operateId;
            this.showModal(name);
        },
        resetSearch() {
            this.search = Object.assign({}, isOperatePos ? defPosSearch : defSearch);
        },
        doSearch() {
            const tbl = this.isOperatePos ? 'operatePostbl' : 'operateConTbl';
            this.$refs[tbl].loadTable();
        }
    },
    components: {
        OperateContentModal,
        OperatePositionModal,
        OperatePosSelectModal,
        ItemgroupModal,
        ProtocolModal,
        OperatePosTable,
        OperateConTable,
        Toolbar,
        Searchbar
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
