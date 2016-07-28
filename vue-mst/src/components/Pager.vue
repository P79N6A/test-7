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

		<nav class="pager-nav pull-right" v-ahref="pages">
			<ul class="pagination va-m">
				<li :class="{disabled: activePage==1}"><a @click="navPrev" class="previous-btn"><span>&laquo;</span></a></li>
				<li v-for="page in pages" @click="navTo(page)" :class="{active: page==activePage}"><a>{{page}}</a></li>
				<li :class="{disabled: activePage==totalPages}"><a @click="navNext"><span>&raquo;</span></a></li>
			</ul>
			<span class="total-pages">共 <i class="text-danger">{{totalPages}}</i> 页</span>
		</nav>
	
	</div>
</template>

<script>
	import {makeNumber,toArray, range} from 'services/public';

	export default {
		name: 'Pager',
		props: {
			pageSize: {//每页记录数
				type: Number,
				coerce: makeNumber,
				default: 10
			},
			pageSizes: {
				type: Array,
				coerce: toArray,
				default(){ 
					return range(this.pageSize,3,10); 
				}
			},
			activePage: {//当前页码
				type: Number,
				coerce: makeNumber,
				default: 1
			},
			totalRecords:{//结果总数
				type: Number,
				coerce: makeNumber,
				default: 120
			},
			viewSize: {//分页组件显示页码个数
				type: Number,
				coerce: makeNumber,
				default: 10
			},
			viewStart: {//分页组件开始页码
				type: Number,
				coerce: makeNumber,
				default: 1
			},
			pageData: {
				twoWay: true,
				type: Array,
				default: ()=>[]
			},
			api: String //获取数据的API
		},
		computed: {
			totalPages(){//总页数
				return Math.ceil(this.totalRecords/this.pageSize);
			},
			pages(){//页码数组
				return range(this.viewStart, Math.min(this.viewSize, this.totalPages-(this.viewStart - 1) ) );
			},
			params(){//请求接口参数
				return {
					pageSize: this.pageSize,
					page: this.activePage
				};
			}
		},
		data: ()=>({loadingData: false}),
		watch:{
			activePage(){//这里不用deep也可以
				this.getPageData();
			},
			pageSize(size){
				this.viewStart = 1;
				if (this.activePage !== 1) {
					this.activePage = 1;
				}else{
					this.getPageData();
				}
			}
		},
		ready(){
			this.getPageData();
		},
		events:{
			reload: 'getPageData'
		},
		methods: {
			getPageData(){
				this.loadingData = true;
				this.$http.get(this.api, this.params).then(function(res){
					this.loadingData = false;
					var data = res.data;
					this.totalRecords = data.totalRecords;
					this.pageSize = data.pageSize;
					this.activePage = data.page;

					// this.pageData = data.specials;
					// 数据同步给Table
					/*if(this.$parent.constructor.name.toLowerCase().indexOf('table')>-1 ){
						this.$parent.tableData = data.specials;
					}*/
					this.$dispatch('tableData', data.specials);
				});
			},
			navPrev(){
				if(this.loadingData) return;
				if(this.activePage > 1){//未到达首页
					if(--this.activePage < this.viewStart){
						this.viewStart = Math.max(1, this.viewStart - this.viewSize);
					}
				}
			},
			navNext(){
				if(this.loadingData) return;
				if(this.activePage<this.totalPages){//未到达末尾页
					if (++this.activePage === this.viewStart + this.viewSize) {//页码变动
						this.viewStart = this.activePage;
					}
				}
				
			},
			navTo(n){
				if(this.loadingData) return;
				this.activePage = n;
			}
		}
	}
</script>

<style lang="less">
	.pager-wrap {
		padding: 0 20px;

		i {
			font-style: normal;
		}
		.pager-info {
			display: inline-block;
			vertical-align: middle;
			line-height: 74px;

			.select-pagesize {
				width: 200px;
				margin-left: 10px;

				.form-control {
					display: inline;
					width: auto;
				}
			}
		}
		.pagination {
			margin-right: 20px;
		}
	}
	
</style>