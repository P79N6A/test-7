<template>
<div class="demo-page vselect-demo container">
	<h2 class="text-center">Vselect component</h2>
	
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
	            <td width="15%">options</td>
	            <td width="10%"><code>Array</code></td>
	            <td width="10%"><code>[]</code></td>
	            <td>选项列表 如: <code>[{text:.., value:.., selected:..},..]</code></td>
	        </tr>
	        <tr>
	            <td>placeholder</td>
	            <td><code>String</code></td>
	            <td><code>请选择</code></td>
	            <td> 下拉列表的提示占位符 </td>
	        </tr>
	        <tr>
	        	<td>btnType</td>
	        	<td><code>String</code></td>
	        	<td><code>default</code></td>
	        	<td>按钮类型</td>
	        </tr>
	        <tr>
	        	<td>btnSize</td>
	        	<td><code>String</code></td>
	        	<td><code>md</code></td>
	        	<td>
	        		按钮大小 可选:
	        		<code>lg</code>
	        		<code>md</code>
	        		<code>sm</code>
	        		<code>xs</code>
	        	</td>
	        </tr>
	        <tr>
	        	<td>multiple</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否多选</td>
	        </tr>
	        <tr>
	        	<td>search</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否可搜索</td>
	        </tr>
	        <tr>
	        	<td>limit</td>
	        	<td><code>Number</code></td>
	        	<td><code>8</code></td>
	        	<td>最多可选几项</td>
	        </tr>
	        <tr>
	        	<td>disabled</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>false</code></td>
	        	<td>是否禁用</td>
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
					<strong>btnType:</strong>
					<radio-group :value.sync="opt.btnType" type="primary">
						<radio-btn value="success">success</radio-btn>
						<radio-btn value="danger">danger</radio-btn>
						<radio-btn value="info">info</radio-btn>
						<radio-btn value="warning">warning</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>btnSize:</strong>
					<radio-group :value.sync="opt.btnSize" type="primary">
						<radio-btn value="lg">lg</radio-btn>
						<radio-btn value="md">md</radio-btn>
						<radio-btn value="sm">sm</radio-btn>
						<radio-btn value="xs">xs</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-2">
					<strong>multiple:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.multiple"> {{opt.multiple}}</label>
				</div>
				<div class="col-md-2">
					<strong>search:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.search"> {{opt.search}}</label>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<strong>disabled:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.disabled"> {{opt.disabled}}</label>
				</div>
				<div class="col-md-4">
					<form-group label="placeholder:" :value.sync="opt.placeholder"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="limit:" :value.sync="opt.limit | mknumber"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<vselect :options="opt.options" :search="opt.search" :disabled="opt.disabled" @select="updateSelectVals" :multiple="opt.multiple" :limit="opt.limit" :placeholder="opt.placeholder" :btn-type="opt.btnType" :btn-size="opt.btnSize"></vselect>
	<!-- <strong>{{selectVals}}</strong> -->

	<div style="padding-bottom: 200px;"></div>
	
</div>
</template>

<script>
	var options = {
		options:[
			{value:'apple', text:'Apple'},
			{value:'banana', text:'Banana'},
			{value:'pear', text:'Pear'},
			{value:'watermelon', text:'Watermelon'},
			{value:'lenmon', text:'Lenmon'}
		],
		placeholder: '选择3种喜欢的水果',
		btnType: 'default',
		btnSize: 'md',
		multiple: true,
		search: true,
		limit: 3,
		disabled: false
	};

	export default {
		data: function(){
			return {
				'opt': options,
				selectVals: ''
			};
		},
		filters:{
			mknumber:{
				read(val){
					return val;
				},
				write(val){
					return Number(val);
				}
			}
		},
		methods:{
			updateSelectVals(opts){
				this.selectVals = opts.map( opt => opt.value ).join(', ');
			}
		}
		
	}

</script>

