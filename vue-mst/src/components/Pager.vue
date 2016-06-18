<template>
	<div class="pager-wrap clearfix">
		<div class="pager-info">
			<span class="total-records">共 <i class="text-danger">{{totalRecords}}</i> 条结果</span>
			<div class="dis-ib select-pagesize">
				每页 
				<select v-model="pageSize" class="form-control" number>
					<option v-for="ps in pageSizes">{{ps}}</option>
				</select>
				 条
			</div>
		</div>
		<nav class="pager-nav pull-right">
			<ul class="pagination va-m">
				<li :class="{disabled: activePage==1}"><a href="javascript:;" @click="navPrev" class="previous-btn"><span>&laquo;</span></a></li>
				<li v-for="page in pages" @click="navTo(page)" :class="{active: page==activePage}"><a href="javascript:;">{{page}}</a></li>
				<li :class="{disabled: activePage==totalPages}"><a href="javascript:;" @click="navNext"><span>&raquo;</span></a></li>
			</ul>
			<span class="total-pages">共 <i class="text-danger">{{totalPages}}</i> 页</span>
		</nav>
	</div>
</template>

<script>
	import VIP from 'services/public';

	export default {
		name: 'Pager',
		props: {
			pageSize: {//每页记录数
				type: Number,
				coerce: VIP.makeNumber,
				default: 10
			},
			pageSizes: {
				type: Array,
				coerce: VIP.toArray,
				default: function(){ 
					return VIP.range(this.pageSize,3,10); 
				}
			},
			activePage: {//当前页码
				type: Number,
				coerce: VIP.makeNumber,
				default: 1
			},
			totalRecords:{//结果总数
				type: Number,
				coerce: VIP.makeNumber,
				default: 120
			},
			viewSize: {//分页组件显示页码个数
				type: Number,
				coerce: VIP.makeNumber,
				default: 10
			},
			viewStart: {//分页组件开始页码
				type: Number,
				coerce: VIP.makeNumber,
				default: 1
			},
			pageData: {
				twoWay: true,
				type: Array,
				default: function(){
					return [];
				}	
			},
			api: String, //获取数据的API
			table:String //关联的表格 <vtable v-ref:specialtbl..>
		},
		computed: {
			totalPages: function(){//总页数
				return Math.ceil(this.totalRecords/this.pageSize);
			},
			pages: function(){//页码数组
				return VIP.range(this.viewStart, Math.min(this.viewSize, this.totalPages-(this.viewStart - 1) ) );
			},
			params: function(){//请求接口参数
				console.warn(this.pageSize, this.activePage);
				return {
					pageSize: this.pageSize,
					page: this.activePage
				};
			}			
		},
		watch:{
			activePage: function(){//这里不用deep也可以
				this.getPageData();
			},
			pageSize: function(size){
				this.viewStart = 1;
				if (this.activePage !== 1) {
					this.activePage = 1;
				}else{
					this.getPageData();
				}
			}
		},
		ready: function(){
			this.getPageData();
		},
		methods: {
			getPageData: function(){
				this.$http.get(this.api, this.params).then(function(res){
					var data = res.data;
					this.totalRecords = data.totalRecords;
					this.pageSize = data.pageSize;
					this.activePage = data.page;

					// this.pageData = data.specials;
					// 数据同步给Table
					if(this.$parent.constructor.name == 'Vtable'){
						this.$parent.tableData = data.specials;
					}
				});
			},
			navPrev: function(){
				if(this.activePage > 1){//未到达首页
					if(--this.activePage < this.viewStart){
						this.viewStart = Math.max(1, this.viewStart - this.viewSize);
					}
				}
			},
			navNext: function(){
				if(this.activePage<this.totalPages){//未到达末尾页
					if (++this.activePage === this.viewStart + this.viewSize) {//页码变动
						this.viewStart = this.activePage;
					}
				}
				
			},
			navTo: function(n){
				this.activePage = n;
			}
		}
	}
</script>

<style>
	.pager-wrap{padding: 0 20px;}	
	.pagination{margin-right: 20px;}
	.pager-info{display: inline-block; vertical-align: middle; line-height: 74px;}
	.pager-info .select-pagesize{width: 200px; margin-left: 10px;}
	.select-pagesize .form-control{display: inline; width: auto;}
	.pager-wrap i{font-style: normal;}
</style>