<template>
<div class="demo-page datePicker-demo container">
	<h2 class="text-center">DatePicker component</h2>
	
	<!-- 参数 -->
	<h3>参数：</h3>
	<table class="table table-bordered">
	    <thead>
	        <tr>
	            <th>参数</th>
	            <th>类型</th>
	            <th>默认值</th>
	            <th>说明</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr>
	            <td width="15%">value <span class="badge">2</span></td>
	            <td width="10%"><code>String</code></td>
	            <td width="10%"><code>null</code></td>
	            <td>当前选中的日期值</td>
	        </tr>
	        <tr>
	            <td>format</td>
	            <td><code>String</code></td>
	            <td><code>MMMM/dd/yyyy</code></td>
	            <td>
	                日期格式 d, dd, M, MM ,MMM , MMMM, yyyy的组合, 如：<code>yyyy-MM-dd</code>
	            </td>
	        </tr>
	        <tr>
	        	<td>disabledDaysOfWeek</td>
	        	<td><code>Array</code></td>
	        	<td><code>[]</code></td>
	        	<td>星期几需要禁用 取值0-6, 0表示星期日, 6表示星期六, 如: [1,2]</td>
	        </tr>
	        <tr>
	        	<td>showResetButton</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>日期文本框内是否显示关闭按钮x</td>
	        </tr>
	        <tr>
	        	<td>width</td>
	        	<td><code>String</code></td>
	        	<td><code>200px</code></td>
	        	<td>日期文本框的宽度， 如: <i>300px</i> <i>50%</i></td>
	        </tr>
	        <tr>
	        	<td>placement</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>
	        		提示框的位置 可选 
	        		<code>top</code>
	        		<code>top-right</code>
	        		</td>
	        </tr>
	    </tbody>
	</table>
	
	
	<!-- 示例 -->
	<h3>示例: </h3>
	<pre>{{ opt | json }}</pre>
	
	<!-- try start-->
	<div class="try">
		<vform horizontal="true" label-cols="4">
			<div class="row">
				<div class="col-md-4">
					<strong>disabledDaysOfWeek:</strong>
					<select is="vselect" :options="dayList" search="false" multiple="true" @select="setDisabledDays" placeholder="select disabled days"></select>
				</div>
				<div class="col-md-4">
					<strong>showResetButton:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.showResetButton"> {{opt.showResetButton}}</label>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<form-group label="width:" :value.sync="opt.width"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="value:" :value.sync="opt.value"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="format:" :value.sync="opt.format"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<datepicker  :value.sync="opt.value" :format="opt.format" :disabled-days-of-week="opt.disabledDaysOfWeek" :width="opt.width" :show-reset-button="opt.showResetButton"></datepicker>
	<strong>date: {{opt.date}}</strong>

	<div class="pb200" style="padding-bottom:200px;" ></div>
</div>
</template>

<script>
	var options = {
		showResetButton: true,
		width: '200px',
		format: 'yyyy-MM-dd',
		value: VIP.formatDate({format:'date', delimeter: '-'}),
		disabledDaysOfWeek: []
	};

	export default {
		data: function(){
			return {
				'opt': options,
				dayList:[
					{text:'0', value:0},
					{text:'1', value:1},
					{text:'2', value:2},
					{text:'3', value:3},
					{text:'4', value:4},
					{text:'5', value:5},
					{text:'6', value:6}
				]
			};
		},
		methods: {
			setDisabledDays(selecteds){
				this.opt.disabledDaysOfWeek = selecteds.map(option=>option.value);
			}
		}
		
	}

</script>

