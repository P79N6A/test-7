<template>
	<div class="btn-group" :class="[size?'btn-group-'+size:'', 'btn-group-'+type, vertical?'btn-group-vertical':'']">
		<slot></slot>
	</div>
</template>

<script>
	import { makeBoolean } from 'services/public';

	export default {
		name:'BtnGroup',
		props: {
			size: {//sm,xs,lg
				type: String,
				size: ''
			},
			type: {//default,success,danger,info,warning
				type: String,
				default: 'default'
			},
			vertical: {
				type: Boolean,
				coerce: makeBoolean,
				default: false
			}
		}
	}
</script>