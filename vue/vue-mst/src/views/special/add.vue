<template>
	<div class="special-add-view">
		<accordion one-at-atime="true">
			<panel  header="vue">
				<h3>vuejs  mvvm</h3>
				<p>some con..</p>
			</panel>
			<panel header="js">
				<h2>js is script</h2>
				<p>hello</p>
			</panel>
			<panel header="php">
				<h2>php</h2>
				<p>echo this</p>
			</panel>
		</accordion>

		<p></p>

		<datepicker  :value.sync="date" format="yyyy-MM-dd"></datepicker> <strong>date: {{date}}</strong>

		<p></p>

		<checkbox-group type="primary"  :value="checks">
			<checkbox-btn value="left">left</checkbox-btn>
			<checkbox-btn value="middle" checked>middle</checkbox-btn>
			<checkbox-btn value="right">right</checkbox-btn>
		</checkbox-group>
		<strong>checks: {{checks|json}}</strong>

		<p></p>

		<radio-group  :value.sync="radioValue" type="success">
			<radio-btn value="left">left</radio-btn>
			<radio-btn value="middle" checked>middle</radio-btn>
			<radio-btn value="right">right</radio-btn>
		</radio-group>
		<strong>radioValue: {{radioValue}}</strong>
	
		<p></p>

		<dropdown btn-text="下拉列表" :links="dropList"></dropdown>

	</div>
</template>

<script>
	export default  {
		name: 'SpecialAddView',
		data(){
			return {
				date: '2015-12-2',
				checks: ['middle'],
				radioValue: 'middle',
				dropList: [
					{text:'action'},
					{text:'another action'},
					{text:'more action', disabled: true},
					{text:''},
					{text:'last action', url:'/index'}
				]
			};
		}
	}
</script>