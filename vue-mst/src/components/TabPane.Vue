<template>
	<div class="tab-pane" transition="tab"  v-show="active">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name:'TabPane',
		props: {
			header: String,
			effect: {
				type: String,
				default: 'fadeIn'
			}
		},
		data(){
			return {index: 0};
		},
		computed:{
			active(){ return this.index === this.$parent.active}
		},
		created(){
			let tabNavs = this.$parent.tabNavs;
			this.index = tabNavs.length;
			tabNavs.push({header: this.header, index:this.index});
		},
		transitions:{
			tab: {
				enterClass: 'slideInDown',
				leaveClass: 'fadeOut'
			}
		}
	}
</script>

<style>
	.tab-transition{
		animation-duration: 0.3s;
		animation-timing-function: ease;
	}
</style>