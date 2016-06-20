<template>
	<div class="tab-wrap">
		<ul class="nav nav-tabs">
			<li v-for="tabNav in tabNavs" :class="{active: active===$index}" @click="active=$index"><a href="javascript:;" data-toggle="tab">{{tabNav.header}}</a></li>
		</ul>
		<div class="tab-content">
			<slot></slot>
		</div>
	</div>
</template>


<script>
	export default {
		name:'Tab',
		props:{
			active: {
					type: Number,
					default: 0
				}
		},
		data:()=>({tabNavs: []})
	}
</script>

<style>
	.tab-content > .tab-pane{display: block;}
</style>