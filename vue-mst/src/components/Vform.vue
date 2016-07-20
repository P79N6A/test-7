<template>
	<form :class="{'form-inline': inline, 'form-horizontal': horizontal}" @submit="submit">
		<slot></slot>
	</form>
</template>

<script>
	export default {
		name: 'Vform',
		props: {
			inline: {
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: false
			},
			horizontal: {
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: false
			},
			labelCols:{
				type: Number,
				coerce: VIP.makeNumber,
				default: 2
			}
		},
		methods: {
			submit(){
				alert('submit form..');
				return false;
			}
		}
	}
</script>