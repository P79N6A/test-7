<template>
<div class="demo-page inputGroup-demo container">
	<h2 class="text-center">InputGroup component</h2>
	
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
	            <td>文本框的值</td>
	        </tr>
	        <tr>
	            <td>addonLeft</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td> 左侧提示文本 </td>
	        </tr>
	        <tr>
	            <td>addonRight</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td> 右侧提示文本 </td>
	        </tr>
	        <tr>
	            <td>placeholder</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td> 占位符文本 </td>
	        </tr>
	        <tr>
	        	<td>size</td>
	        	<td><code>String</code></td>
	        	<td><code>md</code></td>
	        	<td>
	        		文本框的大小 可选 
	        		<code>lg</code>
	        		<code>md</code>
	        		<code>sm</code>
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
					<strong>size:</strong>
					<radio-group :value.sync="opt.size" type="primary">
						<radio-btn value="lg">lg</radio-btn>
						<radio-btn value="md">md</radio-btn>
						<radio-btn value="sm">sm</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<form-group label="addonLeft:" :value.sync="opt.addonLeft"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="addonRight:" :value.sync="opt.addonRight"></form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<form-group label="placeholder:" :value.sync="opt.placeholder"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<input-group :placeholder="opt.placeholder" :size="opt.size" :addon-left="opt.addonLeft" :addon-right="opt.addonRight" :value.sync="opt.value"></input-group>

	<hr>

	<div class="row">
		<div class="col-md-6">
			<input-group :value.sync="email" addon-right="@gmail.com" addon-left="请输入邮箱:"></input-group> email:{{email}}
		</div>
		<div class="col-md-6">
			<input-group :value.sync="keyword" addon-left="请输入关键字:">
				<span class="input-group-btn" slot="addon-right">
					<btn type="success" @click="dosearch">search</btn>
				</span>
			</input-group> keyword:{{keyword}}
		</div>
	</div>
	<div class="row">
		<div class="col-md-6">
			<input-group :value.sync="query">
				<dropdown slot="addon-left" class="input-group-btn" btn-type="info"  :btn-text="queryBtnText" :links="searchFields" :onselect="selectField" :open.sync="showFieldList"></dropdown>
				<span slot="addon-right"  class="input-group-btn">
					<btn type="info" @click="searchSpecial">搜索专题</btn>
				</span>
			</input-group>
			query: {{query}}
		</div>
	</div>
	
</div>
</template>

<script>
	var options = {
		placeholder: 'input your email',
		addonLeft: 'Email:',
		addonRight: '@test.com',
		size: 'md',
		value: ''
	};

	export default {
		data: function(){
			return {
				'opt': options,
				email: '',
				keyword:'',
				searchFields: [
					{text:'专题名称'},
					{text:'专题类别'},
					{text:'专题发布者'},
					{text:''},
					{text:'专题品牌'}
				],
				queryBtnText: '专题名称',
				query: '',
				showFieldList: false,
			};
		},
		methods:{
			dosearch(){
				alert('搜索关键字:  '+ this.keyword);
			},
			selectField(link){
				this.queryBtnText = link.text;
				this.showFieldList = false;
			},
			searchSpecial(){
				alert('搜索 '+ this.queryBtnText + ' 包含: ' + this.query);
			}
		}
		
	}

</script>

