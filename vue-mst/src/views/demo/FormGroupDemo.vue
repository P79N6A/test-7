<template>
<div class="demo-page vform-demo container">
	<h2 class="text-center">FormGroup component</h2>
	
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
	            <td width="20%"><code>String, Array, Number</code></td>
	            <td width="10%"><code>null</code></td>
	            <td>输入控件的值</td>
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
	        <tr>
	            <td>size</td>
	            <td><code>String</code></td>
	            <td><code>md</code></td>
	            <td>
	                栅格列的响应式类 如:<i>lg</i> 则: 控件的类为 <code>col-lg-*</code>
	                <code>lg</code>
	                <code>md</code>
	                <code>sm</code>
	            </td>
	        </tr>
	        <tr>
	            <td>disabled</td>
	            <td><code>Boolean</code></td>
	            <td><code>false</code></td>
	            <td>
	                控件是否禁用
	            </td>
	        </tr>
	        <tr>
	            <td>feedback</td>
	            <td><code>Boolean</code></td>
	            <td><code>false</code></td>
	            <td>
	                是否根据控件的校验状态添加图标
	            </td>
	        </tr>
	        <tr>
	            <td>readonly</td>
	            <td><code>Boolean</code></td>
	            <td><code>false</code></td>
	            <td>
	                控件是否只读
	            </td>
	        </tr>
	        <tr>
	            <td>state</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td>
	                控件的校验状态
	                <code>success</code>
	                <code>warning</code>
	                <code>error</code>
	            </td>
	        </tr>
	        <tr>
	            <td>inputName</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td> 控件name属性的值 </td>
	        </tr>
	        <tr>
	            <td>placeholder</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td> 控件的占位文本 </td>
	        </tr>
	        <tr>
	            <td>label</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td> 控件的label </td>
	        </tr>
	        <tr>
	            <td>tips</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td> 输入提示信息 </td>
	        </tr>
	        <tr>
	            <td>inputType</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td> 控件类型 </td>
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
					<strong>state:</strong>
					<radio-group :value.sync="opt.state" type="primary">
						<radio-btn value="success">success</radio-btn>
						<radio-btn value="warning">warning</radio-btn>
						<radio-btn value="error">error</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>size:</strong>
					<radio-group :value.sync="opt.size" type="primary">
						<radio-btn value="lg">lg</radio-btn>
						<radio-btn value="md">md</radio-btn>
						<radio-btn value="sm">sm</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>disabled:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.disabled"> {{opt.disabled}}</label>
				</div>
				<div class="col-md-4">
					<strong>feedback:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.feedback"> {{opt.feedback}}</label>
				</div>

				<div class="col-md-4">
					<strong>readonly:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.readonly"> {{opt.readonly}}</label>
				</div>
				<div class="col-md-4">
					<strong>horizontal:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.horizontal"> {{opt.horizontal}}</label>
				</div>
				<div class="col-md-4">
					<form-group label="labelCols:" :value.sync="opt.labelCols  | mknumber"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="placeholder:" :value.sync="opt.placeholder"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="label:" :value.sync="opt.label"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="tips:" :value.sync="opt.tips"></form-group>
				</div>

				
			</div>
		</vform>
	</div>
	<!-- try end -->
	
	<vform :horizontal="opt.horizontal" :label-cols="opt.labelCols">
		<form-group :label="opt.label" :input-type="opt.type" :tips="opt.tips" :value.sync="opt.value" :size="opt.size" :horizontal="opt.horizontal" :disabled="opt.disabled" :feedback="opt.feedback" :readonly="opt.readonly" :label-cols="opt.labelCols" :state="opt.state" :placeholder="opt.placeholder"></form-group>
	</vform>

	<hr>

	<vform horizontal="true">
		<form-group feedback="true" state="success" label="user" input-type="text" tips="只能包含字母和数字" :value.sync="user.name"></form-group>

		<form-group readonly="false" label="password" input-type="password" tips="4-6为字母和数字"  :value.sync="user.pwd"></form-group>

		<form-group disabled="false" label="email" input-type="email" :value.sync="user.email"></form-group>


		<form-group  state="success" label="image" input-type="file" :value.sync="user.img"></form-group>

		<form-group>
			<form-checkboxes slot="input" :check-list="checkList" :value.sync="user.hobbies"></form-checkboxes>
		</form-group>

		<form-group label="department">
			<select slot="input" class="form-control" v-model="user.dep">
				<option value="depA">部门A</option>
				<option value="depB">部门B</option>
				<option value="depC">部门C</option>
			</select>
		</form-group>

		<form-group>
			<button slot="input" type="submit" class="btn btn-default">submit</button>
		</form-group>
	</vform>
	
</div>
</template>

<script>
	var options = {
		label: "用户名:", 
		inputType: "text", 
		tips: "只能包含字母和数字", 
		value: '',
		size: 'md',
		horizontal: false,
		disabled: false,
		feedback: false,
		readonly: false,
		labelCols: 2,
		state: '',
		placeholder: 'your name'
	};

	export default {
		data: function(){
			return {
				'opt': options,
				'user':{
					name: 'xiaoming',
					pwd: '',
					email: 'xiaoming@gmail.com',
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

