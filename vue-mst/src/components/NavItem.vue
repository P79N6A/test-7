<template>
	<li :class="{active: link.active}" @click="setActive(link)">
		<a v-link="{path: link.url}">{{link.text}}</a>
	</li>
</template>

<script>
	export default {
		name: 'NavItem',
		props: {
			link: Object,
			require: true
		},
		methods: {
			setActive(link){
				this.$dispatch('activate', link);
			}
		}
	}
</script>