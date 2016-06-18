<template>
	<div class="special-page">
		<vtable sort-key="title">
			<pager api="querySpecial" slot="pager"></pager>
		</vtable>
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
