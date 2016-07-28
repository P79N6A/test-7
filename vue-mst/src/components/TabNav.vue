<template>
	<li :class="{active: tabNav.active}" @click="setActive(tabNav)">
		<a data-toggle="tab">{{tabNav.header}}</a>
	</li>
</template>

<script>
	export default {
		name: 'TabNav',
		props: {
			tabNav: Object,
			require: true
		},
		methods: {
			setActive(tabNav){
				//this.$dispatch('activate', tabNav);// tab activate, nav 捕获事件并处理
				this.$dispatch('setActiveIndex', tabNav.index); //tabpane activate ,通过计算属性 关联activeIndex和tabpane.active
			}
		}
	}
</script>