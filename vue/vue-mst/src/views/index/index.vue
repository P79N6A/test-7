<template>
	<div class="index-view">
		<h3>最新版本更新情况 (V3.12)</h3>
		<ul>
			<li>档期个性化—支持走dap数据录入的档期个性化排序 档期样式更新—支持显示红包金额 专题分类管理功能—支持专题分</li>
			<li>富文本组件—可支持图文混排的专题页制作 新增专题权限管理—完善角色权限管理，支持专题分类可见 </li>
			<li>操作优化—支持在发布预览页直接调整显示隐藏...</li>
		</ul>
	</div>
</template>

<script>
	
	export default {
		name: 'IndexView',
		ready() {
			console.log('index ready..');
		},
		data() {
			return {
				user: 'sindy'
			}
		}
	}
</script>