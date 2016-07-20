<template>
	<div class="demo-home">

		<div class="container-fluid">
		<accordion one-at-atime="true">
			<panel header="常用组件" is-open="true">
				<div class="row">
					<div class="col-md-3 col-sm-6" v-for="cmp in comCmpList">
						<thumbnail :header="cmp.header" v-link="cmp.link"></thumbnail>
					</div>					
				</div>
			</panel>
			<panel header="其他组件">
				<div class="row">
					<div class="col-md-3 col-sm-6" v-for="cmp in otherCmpList">
						<thumbnail :header="cmp.header" v-link="cmp.link"></thumbnail>
					</div>
				</div>
			</panel>
		</accordion>
		</div>
	</div>
</template>
<script>
	import { toggleSidebar } from 'appVuex/actions';

	var comCmpList = [
		{header:"Alert", link:"/demos/alert"},
		{header:"Modal", link:"/demos/modal"},
		{header:"Dropdown", link:"/demos/dropdown"},
		{header:"Vselect", link:"/demos/vselect"},
		{header:"Vnav", link:"/demos/vnav"},
		{header:"FormGroup", link:"/demos/formGroup"},
		{header:"Vform", link:"/demos/vform"},
		{header:"Tab", link:"/demos/tab"},
		{header:"Pager", link:"/demos/pager"},
		{header:"Vtable", link:"/demos/vtable"}
	];

	var otherCmpList = [
		{header:"Accordion", link:"/demos/accordion"},
		{header:"Affix", link:"/demos/affix"},
		{header:"Aside", link:"/demos/aside"},
		{header:"Btn", link:"/demos/btn"},
		{header:"BtnGroup", link:"/demos/btnGroup"},
		{header:"CheckboxGroup", link:"/demos/checkboxGroup"},
		{header:"DatePicker", link:"/demos/datePicker"},
		{header:"InputGroup", link:"/demos/inputGroup"},
		{header:"Panel", link:"/demos/panel"},
		{header:"Popover", link:"/demos/popover"},
		{header:"RadioGroup", link:"/demos/radioGroup"},
		{header:"Thumbnail", link:"/demos/thumbnail"},
		{header:"Tooltip", link:"/demos/tooltip"},
		{header:"Typeahead", link:"/demos/typeahead"}
	];


	export default {
		data(){
			return {
				comCmpList,
				otherCmpList
			}
		},
		vuex: {
			actions: {
				toggleSidebar
			}
		},
		ready(){
			this.toggleSidebar(false);
		}
	}
</script>

<style lang="less">
	.demo-home{
		.thumbnail{
			cursor: pointer;
			background-color: #F5F0EC;
			&:hover{
				background-color: #DEEEE7;
				h3{
					transform:translate(35%,0);
				}
			}
			h3{
				transition:all .3s ease;
			}

		}
	}
</style>