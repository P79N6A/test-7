<template>
	<div class="badge">
		<em>{{num}}</em>

	</div>
</template>


<script>
	export default {
		data(){
			return {
				num: 10
			}
		},
		created(){
			console.log('vtui.badge ready..');
		}
	}
</script>

<style lang="less">
	@import "~css/public.less";
	.badge{
		display: inline-block;
		border-radius: 8px;
		background: #ccc url('~images/a.jpg') no-repeat;
		padding: 10px;

	}
</style>