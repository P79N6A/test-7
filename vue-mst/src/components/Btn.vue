<template>
	<button type="button" class="btn" :class="[size?'btn-'+size:'', 'btn-'+type]" :disabled="disabled">
		<slot></slot>
	</button>
</template>

<script>
	import {makeBoolean} from 'services/public';
	
	export default {
		name:'Btn',
		props: {
			size: {//sm,xs,lg
				type: String,
				default: ''
			},
			type: {//default,success,danger,info,warning
				type: String,
				default: 'default'
			},
			disabled: {
				type: Boolean,
				coerce: makeBoolean,
				default: false
			}
		},
		computed: {
			inBtnGroup(){
				return this.$parent.constructor.name.toLowerCase().indexOf('btngroup')>-1;
			},
			btnStyle(){
				return this.$parent.size+'-'+this.$parent.type;
			}
		},
		methods:{
			update(){
				let parent = this.$parent;
				if (this.inBtnGroup) {//同步btnGroup的设置
					this.type = parent.type;
					this.size = parent.size;
				}
			}
		},
		created(){
			this.update();
		},
		watch:{
			btnStyle(){
				this.inBtnGroup && this.update();
			}
		}
	}
</script>