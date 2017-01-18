<template>
<div class="demo-page vform-demo container">
	<h2 class="text-center">Vform component</h2>
	
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
	            <td width="15%">inline</td>
	            <td width="10%"><code>Boolean</code></td>
	            <td width="10%"><code>true</code></td>
	            <td>是否一行包含多个input</td>
	        </tr>
	        <tr>
	            <td>horizontal</td>
	            <td><code>Boolean</code></td>
	            <td><code>false</code></td>
	            <td>
	                水平布局 label 和 input 一行显示
	            </td>
	        </tr>
	        <tr>
	        	<td>labelCols</td>
	        	<td><code>Number</code></td>
	        	<td><code>2</code></td>
	        	<td>label占几列 如: <i>3</i> 则 label的class 为 <code>col-md-2</code> </td>
	        </tr>
	    </tbody>
	</table>
	
	
	<!-- 示例 -->
	<h3>示例: </h3>
	<pre>{{ opt | json }}</pre>


	<pre>{{user | json}}</pre>
	
	<!-- try start-->
	<div class="try">
		<vform horizontal="true" label-cols="4">
			<div class="row">
				<div class="col-md-4">
					<strong>inline:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.inline"> {{opt.inline}}</label>
				</div>
				<div class="col-md-4">
					<strong>horizontal:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.horizontal"> {{opt.horizontal}}</label>
				</div>
				<div class="col-md-4">
					<form-group label="labelCols:" :value.sync="opt.labelCols  | mknumber"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->
	

	<vform :inline="opt.inline" :horizontal="opt.horizontal" :label-cols="opt.labelCols">
		<form-group :horizontal="opt.horizontal" :label-cols="opt.labelCols" label="user" input-type="text" tips="只能包含字母和数字" :value.sync="user.name"></form-group>

		<form-group :horizontal="opt.horizontal" :label-cols="opt.labelCols" label="password" input-type="password" tips="4-6为字母和数字"  :value.sync="user.pwd"></form-group>
		
		<form-group :horizontal="opt.horizontal" :label-cols="opt.labelCols" label="email" input-type="email" :value.sync="user.email"></form-group>
		
		<form-group :horizontal="opt.horizontal" :label-cols="opt.labelCols" label="image" input-type="file" :value.sync="user.img"></form-group>
		
		<form-group :horizontal="opt.horizontal" :label-cols="opt.labelCols">
			<form-checkboxes slot="input" :check-list="checkList" :value.sync="user.hobbies"></form-checkboxes>
		</form-group>
		
		<form-group :horizontal="opt.horizontal" :label-cols="opt.labelCols">
			<button slot="input" type="submit" class="btn btn-default">submit</button>
		</form-group>
	</vform>
	
</div>
</template>

<script>
	var options = {
		inline: false,
		horizontal: true,
		labelCols: 4
	};

	export default {
		data: function(){
			return {
				'opt': options,
				user:{
					name: 'sindy',
					pwd: '',
					email: 'sindy@gmail.com',
					hobbies:['music'],
					remember: true,
					dep:''
				},
				checkList: [
					{text:'看电影', value:'movie'},
					{text:'听音乐', value:'music'},
					{text:'购物', value:'shop'},
					{text:'打球', value:'football'}
				]
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
		}
		
	}

</script>

