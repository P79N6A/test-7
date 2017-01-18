<template>
	<div class="loading" id="loading" v-show="show">
		<img src="~img/loading.gif" alt="loading">
	</div>
</template>

<script>
	import {makeBoolean} from 'services/public';

	export default {
		name: 'Loading',
		props: {
			show: {
				type: Boolean,
				coerce: makeBoolean,
				default: false
			}
		}
	}
</script>