<template>
<div class="demo-page thumbnail-demo container">
	<h2 class="text-center">Thumbnail component</h2>
	
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
	            <td width="15%">imgLink</td>
	            <td width="10%"><code>String</code></td>
	            <td width="10%"><code>null</code></td>
	            <td>点击图片跳转的链接</td>
	        </tr>
	        <tr>
	            <td>imgSrc</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td> 图片的url </td>
	        </tr>
	        <tr>
	        	<td>header</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>图文缩略图的标题</td>
	        </tr>
	        <tr>
	        	<td>hasCaption</td>
	        	<td><code>Boolean</code></td>
	        	<td><code>null</code></td>
	        	<td>缩略图是否带说明文本</td>
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
					<form-group label="imgLink:" :value.sync="opt.imgLink"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="imgSrc:" :value.sync="opt.imgSrc"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="header:" :value.sync="opt.header"></form-group>
				</div>
				<div class="col-md-4">
					<strong>hasCaption:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.hasCaption"> {{opt.hasCaption}}</label>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->
	
	<div class="row">
		<div class="col-md-4">
			<thumbnail :img-link="opt.imgLink" :img-src="opt.imgSrc" :header="opt.header" :has-caption="opt.hasCaption">
				<p>商品详细内容...</p>
			</thumbnail>
		</div>
	</div>
	
</div>
</template>

<script>
	var options = {
		imgLink: 'http://www.baidu.com',
		imgSrc: '/src/assets/images/6.jpg',
		header: '商品描述标题',
		hasCaption: true
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		}
		
	}

</script>

