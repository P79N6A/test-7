<template>
<div class="demo-page panel-demo container">
	<h2 class="text-center">Panel component</h2>
	
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
	            <td width="15%">isOpen</td>
	            <td width="10%"><code>Boolean</code></td>
	            <td width="10%"><code>false</code></td>
	            <td>展开或折叠面板</td>
	        </tr>
	        <tr>
	            <td>header</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td>
	                面板标题栏内容
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
					<strong>isOpen:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.isOpen"> {{opt.isOpen}}</label>
				</div>
				<div class="col-md-4">
					<form-group label="header:" :value.sync="opt.header"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<panel :header="opt.header" :is-open="opt.isOpen">
		<h2>hello</h2>
		<p>这里是内容..</p>
	</panel>

	<panel :is-open="opt.isOpen" class="panel-warning">
		<a slot="header" href="javascript:;">
			<p><i class="caret fr"></i> <em class="text-success">商品详情</em> <i class="glyphicon glyphicon-heart"></i></p>
		</a>
		<h2>hello</h2>
		<p>这里是内容..</p>
	</panel>


	
</div>
</template>

<script>
	var options = {
		header: '面板标题',
		isOpen: false
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		}
		
	}

</script>

