<template>
	<div class="alert" v-show="show">
		<!-- img url -->
		<button class="close">&times;</button>
		<div class="alert-con">
			<img src="/images/a.jpg" /><strong>提示：</strong> {{tips}}
			<p><img src="/images/b.jpg" /></p>
		</div>
	</div>
</template>


<script>

import utils from 'utils';

	export default {
		data(){
			return {
				tips: 'hello',
				show: true
			}
		},
		created(){
			this.tips = utils.reverse(this.tips);
		},
		methods:{
			close(){
				this.show = false; 
			}
		}
	}
</script>

<!-- 
# import 进来的样式也会被scoped, import 等同copy
 -->
<style lang="less" scoped>
	@import "~css/public.less";
	/*@import '../assets/css/vars.less';*/

	.alert{
		border-radius: 3px;
		position: relative;
		color: @color;
		background: pink url('~images/a.jpg') repeat-x;
	}

	.close{
		position: absolute;
		top: 0;
		right: 0;
		font-size: 20px;
	}

</style>