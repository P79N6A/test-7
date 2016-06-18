<template>
	<div class="view-demo">
		<h3>this is demo page</h3>
		<p>demo..{{user}}</p>
	</div>
</template>

<script>
	export default {
		ready() {
			console.log('demo.. ready..');
		},
		data() {
			return {
				user: 'sindy'
			}
		}
	}
</script>

<style scoped>
	h3{
		background-color: skyblue;
	}
</style>