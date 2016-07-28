<template>
	<div class="form-group" :class="[state ? 'has-'+state : '', {'has-feedback': feedback}]">
		<label v-if="label" :class="[labelColClass]">{{label}}</label>
		<div :class="inputColClass" v-if="horizontal">
			<slot name="input">
				<input class="form-control" v-model="value" type="{{inputType}}" id="{{inputName}}" name="{{inputName}}" placeholder="{{placeholder}}" :disabled="disabled" :readonly="readonly" />
				<p class="help-block" v-if="tips">{{tips}}</p>
				<span class="glyphicon form-control-feedback" :class="iconClass" v-if="feedback"></span>
			</slot>
		</div>
		<slot  v-else name="input">
			<input class="form-control" v-model="value" type="{{inputType}}" id="{{inputName}}" name="{{inputName}}" placeholder="{{placeholder}}"  :disabled="disabled" :readonly="readonly" />
			<p class="help-block" v-if="tips">{{tips}}</p>
		</slot>
	</div>
</template>


<script>
	export default {
		name: 'FormGroup',
		props: {
			value:{
				type: [String, Array, Number],
				twoWay: true
			},
			size: {
				type: String,
				default: 'md' //lg sm md
			},
			horizontal:{
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: true
			},
			disabled:{
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: false
			},
			feedback:{
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: false
			},
			readonly:{
				type: Boolean,
				coerce: VIP.makeBoolean,
				default: false
			},
			labelCols:{
				type: Number,
				coerce: VIP.makeNumber,
				default: 2
			},
			state: {
				type: String  //success warning error
			},
			inputName: String,
			placeholder:String,
			label: String,
			tips: String,
			inputType: {
				type: String, 
				default: 'text' //text password date number url email tel
			}

		},
		computed:{
			labelColClass(){
				var cols = 'col-'+this.size+'-'+this.labelCols;
				return this.horizontal? (this.label ? 'control-label ': '') + cols : '';
			},
			inputColClass(){
				var cols = 'col-'+this.size+'-'+(12-this.labelCols);
				if (this.horizontal && !this.label) {
					cols += ' ' + this.labelColClass.replace(/(-\d+)/, '-offset$1');
				}
				return cols;
			},
			iconClass(){
				var cls = '';
				if (this.state === 'success') {
					cls = 'glyphicon-ok';
				}else if(this.state === 'error'){
					cls = 'glyphicon-remove';
				}else{
					cls = 'glyphicon-warning-sign';
				}
				return cls;
			}
		},
		created(){
			let parent = this.$parent;
			if (parent.constructor.name === 'Vform') {
				this.horizontal = parent.horizontal;
				parent.labelCols && (this.labelCols = parent.labelCols);
			}
		}
	}
</script>