<template>
    <div class="itemgroup-modal">

        <el-dialog title="选择商品组" v-model="visible">

            <div class="searchbar">
                <el-form inline>
                    <el-form-item label="商品组ID:">
                        <el-input v-model="search.id"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="doSearch">查询</el-button>
                        <el-button @click="resetSearch">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <el-table :data="tableData" stripe>
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

            <el-pagination layout="prev, pager, next, total" :total="total" :page-size="pageSize" :current-page="currentPage" v-show="total > pageSize" @current-change="loadTable"></el-pagination>
        
            <div class="dialog-footer under-pagination" slot="footer">
                <el-button @click="show(false)">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

import {loadTableFn, bus} from './helper';

export default {
    name: 'ItemgroupModal',
    props: [],
    data() {
        return {
            search: {
                id: ''
            },
            visible: false,
            tableData: [],
            pageSize: 10, // 每页10个
            currentPage: 1, //页码
            total: 10 // 总记录数
        }
    },
    computed: {
        pagingData() {
            return {
                current_page: this.currentPage,
                page_size: this.pageSize
            };
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
            this.search = {
                id: ''
            };
        },
        selectItemGroup(row) {
            bus.$emit('select-itemgroup', row);
            this.show(false);
        },
        loadTable: loadTableFn('/item_group/query_detail.do')
    },
    created() {
        this.loadTable();
    }
};
</script>
