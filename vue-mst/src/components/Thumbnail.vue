<template>
	<div class="thumbnail">
		<a :href="imgLink" v-if="imgSrc"><img :src="imgSrc"></a>
		<div class="caption" v-if="hasCaption">
			<slot name="header">
				<h3>{{header}}</h3>
			</slot>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import { makeBoolean } from 'services/public';

	export default {
		name: 'Thumbnail',
		props:{
			imgLink: String,
			imgSrc: String,
			header: String,
			hasCaption: {
				type: Boolean,
				coerce: makeBoolean
			}
		},
		created(){
			if (this.header) {
				this.hasCaption = true;
			}
		}
	}
</script>