<template>
	<div class="input-group" :class="size ? 'input-group-'+size : ''">
		<slot name="addon-left">
			<span class="input-group-addon"  v-if="addonLeft">{{addonLeft}}</span>
		</slot>
		<input type="text"  class="form-control" :placeholder="placeholder" v-model="value">
		<slot name="addon-right">
			<span class="input-group-addon"  v-if="addonRight">{{addonRight}}</span>
		</slot>
	</div>
	
</template>

<script>
	export default {
		name:'InputGroup',
		props: {
			placeholder: String,
			size: {
				type: String,
				default: 'md' //lg sm md
			},
			addonLeft: String,
			addonRight: String,
			value: {
				type: String,
				twoWay: true
			}
		}
	}
</script>

<style style="scoped">
	.input-group .dropdown-wrap{
		display: table-cell;
	}
</style>

