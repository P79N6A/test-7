<template>
	<div class="tab-pane animated" :transition="effect | random "  v-show="active">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name:'TabPane',
		props: {
			header: String,
			effect: {
				type: Array,
				default:()=>VIP.aniNames
			}
		},
		data(){
			return {index: 0};
		},
		computed:{
			active(){ return this.index === this.$parent.active; }
		},
		created(){
			this.index = this.$parent.tabNavs.length;
			this.$dispatch('addTabNav', {header: this.header, index:this.index, active: this.active}); //创建对应的tabNav
		}
	}
</script>
