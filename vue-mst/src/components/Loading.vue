<template>
	<div class="loading" id="loading" v-show="show">
		<img src="/src/assets/images/loading.gif" alt="loading">
	</div>
</template>

<script>
	export default {
		name: 'loading',
		props: ['show']
	}
</script>