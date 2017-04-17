<template>
    <div class="operate-view">
    	<!-- tabs -->
    	<el-tabs v-model="activeTab">
    		<el-tab-pane name="operatePosTab" label="新运营位管理">新运营位管理</el-tab-pane>
    		<el-tab-pane name="operateContentTab" label="新运营位内容管理">
    			<!-- 工具条 -->
    			<div class="toolbar">
	    			<el-button type="primary" @click="modalVisible = true">添加内容+</el-button>
	    			<el-button type="primary" @click="setStatusForChecked('ACTIVE')">激活</el-button>
	    			<el-button type="primary" @click="setStatusForChecked('FREEZE')">取消激活</el-button>
    			</div>
    			<!-- 搜索条 -->
    			<div class="searchbar">
    				<el-form :inline="true" label-width="80px" :model="search">
    					<el-form-item label="内容名称:">
    						<el-input v-model="search.name"></el-input>
    					</el-form-item>
    					<el-form-item label="内容ID:">
    						<el-input v-model="search.id"></el-input>
    					</el-form-item>
    					<el-form-item label="平台:">
    						<el-select clearable v-model="search.app_type" placeholder="请选择">
    							<el-option label="莴笋APP" value="1"></el-option>
    							<el-option label="BA" value="2"></el-option>
    						</el-select>
    					</el-form-item>
    					<el-form-item label="运营位ID:">
    						<el-input v-model="search.resource_id"></el-input>
    					</el-form-item>
    					<el-form-item label="是否激活:">
    						<el-select clearable v-model="search.status" placeholder="请选择">
    							<el-option label="激活" value="1"></el-option>
    							<el-option label="未激活" value="0"></el-option>
    						</el-select>
    					</el-form-item>
    					<el-form-item label="是否过期:">
    						<el-select clearable v-model="search.expire" placeholder="请选择">
    							<el-option label="过期" value="1"></el-option>
    							<el-option label="未过期" value="0"></el-option>
    						</el-select>
    					</el-form-item>
    					<el-form-item>
    						<el-button type="primary" @click="doSearch">查询</el-button>
    						<el-button type="primary" @click="resetSearch">重置</el-button>
    					</el-form-item>
    				</el-form>
    			</div>
				
				<!-- 表格 -->
				<el-table stripe :data="operateContents" :default-sort="{prop: 'id', order: 'descending'}" @selection-change="handleSelectionChange">
					<el-table-column align="center" type="selection" width="60"></el-table-column>
					<el-table-column align="center" label="ID" width="80" prop="id" sortable></el-table-column>
					<el-table-column align="center" label="内容名称" prop="name" sortable width="200">
						<template scope="scope">
							<el-button type="text" @click.stop="getOperate(item.id)">{{scope.row.name}}</el-button>
						</template>
					</el-table-column>
					<el-table-column align="center" label="内容" >
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
							<el-button @click.stop="getOperate(scope.row.id)">编辑</el-button>
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
    	<operate-content-modal :current="currentRow" :show="modalVisible" @hide="modalVisible = false"></operate-content-modal>
    </div>
</template>

<script>

import Vue from 'vue';
import OperateContentModal from './OperateContentModal';

var defSearch = {
	name: '',
	id: '',
	app_type: '',
	resource_id: '',
	status: '',
	expire: ''
};

function onsuccess(callback, tips) {
	return function(res) {
		var result = res.data;
		var data = result.data.data;
		if (result.code - 0 === 10000) {
			callback(data, result);
			tips && Vue.prototype.$message.success(tips === true ? result.msg : tips);
		} else {
			Vue.prototype.$message.error('请求失败:' + result.msg);
		}
	};	
}

function eachKey(obj, fn) {
	Object.keys(obj).forEach(key => {
		fn(obj[key], key, obj);
	});
}

function queryStringify(obj) {
	var pairs = [];
	eachKey(obj, (val, key) => {
		pairs.push(encodeURI(`${key}=${JSON.stringify(val).replace(/['"]/g, '')}`));
	});
	return pairs.join('&');
}


export default {
	name: 'OperateView',
    data(){
        return {
        	activeTab: 'operatePosTab',
        	search: Object.assign({}, defSearch),
        	operateContents: [],
            pageSize: 2, // 每页10个
            currentPage: 1, //页码
            total: 10, // 总记录数
            checkedIds: [], // 选择行的id
            currentRow: {},
            modalVisible: false
        };
    },
    computed: {
    	pagingData() {
    		return {offset: (this.currentPage - 1) * this.pageSize, count: this.pageSize};
    	}
    },
    methods: {
    	createOperateContent() { // 添加运营位内容

    	},
    	resetSearch() {
    		this.search = defSearch;
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
    		const data = {ids, status};
    		this.axios.post('/resource/set_data_status.do', queryStringify(data)).then(onsuccess(data => {
    			// reload table
    			this.loadTable();
    		}, `${action}成功`));
    	},
    	handleSelectionChange(checkeds) {
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
    	loadTable(curPage) {
    		curPage && (this.currentPage = curPage);
    		var data = Object.assign({}, this.pagingData, this.search);
    		this.axios.post('/resource/query_data.do', queryStringify(data)).then(onsuccess((data, res) => {
    			this.operateContents = data;
    			this.total = res.data.total_count - 0;
    		}));
    	}
    },
    filters: {
    	typeText(i) {
    		var types = ['', '图片', '商品', '专题'];
    		return types[i] || '';
    	},
    	statusText(i) {
    		var statuses = ['未激活', '激活'];
    		return statuses[i] || '';
    	}
    },
    components: {
    	OperateContentModal
    },
    created() {
    	this.loadTable();
    }
}

</script>

<style scoped>
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
	}

</style>