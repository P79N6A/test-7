<template>
<div class="demo-page aside-demo container">
	<h2 class="text-center">Aside component</h2>
	
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
	            <td width="15%">show <span class="badge">2</span></td>
	            <td width="10%"><code>Boolean</code></td>
	            <td width="10%"><code>true</code></td>
	            <td>显示或隐藏侧边栏</td>
	        </tr>
	        <tr>
	            <td>placement</td>
	            <td><code>String</code></td>
	            <td><code>right</code></td>
	            <td>
	                侧边栏的位置 可选值
	                <code>left</code>
	                <code>right</code>
	            </td>
	        </tr>
	        <tr>
	        	<td>header</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>标题</td>
	        </tr>
	        <tr>
	        	<td>width</td>
	        	<td><code>Number</code></td>
	        	<td><code>320</code></td>
	        	<td>侧边栏宽度</td>
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
					<strong>placement:</strong>
					<radio-group :value.sync="opt.placement" type="primary">
						<radio-btn value="left">left</radio-btn>
						<radio-btn value="right">right</radio-btn>
					</radio-group>
				</div>
				<div class="col-md-4">
					<strong>show:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.show"> {{opt.show}}</label>
				</div>
				<div class="col-md-4">
					<form-group label="header:" :value.sync="opt.header"></form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<form-group label="width:" :value.sync="opt.width  | mknumber"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<btn type="warning" size="1g" @click="opt.show = !opt.show">显隐Aside组件</btn>
	
	<aside :header="opt.header" :show.sync="opt.show" :placement="opt.placement" :width="opt.width">
		<h2>前定义的dosomething函数,并且它的参数就是</h2>
		<p>
			我们需要的json数据，这样我们就跨域获得了我们需要的数据。 这样jsonp的原理就很清
		</p>
		<p>
			楚了，通过script标签引入一个js文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。所以jsonp是需要服务器端的页面进行相应的配合的。 知道jsonp跨域的原理后我们就可以用js动态生成script标签来进行跨域操作了，而不用特意的手动的书写那些
		</p>
		<btn>submit</btn>
	</aside>
	
</div>
</template>

<script>
	var options = {
		header: '操作面板',
		show: true,
		placement: 'right',
		width: 300
	};

	export default {
		data: function(){
			return {
				'opt': options
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

