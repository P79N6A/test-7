<template>
    <div class="protocols-modal">

        <el-dialog title="选择伪协议" v-model="visible">
            
            <el-table :data="tableData" stripe>
                <el-table-column label="伪协议名称" prop="name" sortable>
                    <template scope="scope">
                        <el-button type="text" @click.stop="selectProtocol(scope.row)">{{scope.row.name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="伪协议别名" prop="code" sortable></el-table-column>
                <el-table-column label="协议" prop="protocol"></el-table-column>
                <el-table-column label="参数" prop="param_list"></el-table-column>
                <el-table-column label="备注" prop="remark"></el-table-column>
            </el-table>

            <el-pagination layout="prev, pager, next, total" :total="total" :page-size="pageSize" :current-page="currentPage" v-show="total > pageSize" @current-change="loadTable"></el-pagination>
            
            <div class="dialog-footer under-pagination" slot="footer">
                <el-button @click="show(false)">取消</el-button>
            </div>

        </el-dialog>

    </div>
</template>

<script>

import {loadTableFn, bus, successHandler, getApi} from './helper';

export default {
    name: 'ProtocolModal',
    props: [],
    data() {
        return {
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
        selectProtocol(row) {
            bus.$emit('select-protocol', row);
            this.show(false);
        },
        loadTable() {
            this.axios.post(getApi('/resource/get_protocols.do')).then(successHandler((data, res) => {
                this.tableData = res.data.module;
            }));
        }
    },
    created() {
        this.loadTable();
    }
};
</script>
