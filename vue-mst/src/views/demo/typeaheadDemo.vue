<template>
<div class="demo-page typeahead-demo container">
	<h2 class="text-center">Typeahead component</h2>
	
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
	            <td width="15%">data</td>
	            <td width="10%"><code>Array</code></td>
	            <td width="30%"><code>null</code></td>
	            <td>列表数据</td>
	        </tr>
	        <tr>
	            <td>api</td>
	            <td><code>String</code></td>
	            <td><code>null</code></td>
	            <td>
	                获取列表数据的接口
	            </td>
	        </tr>
	        <tr>
	            <td>ondata</td>
	            <td><code>Function</code></td>
	            <td>
		            <code>
		            function(res){<br/>
			            this.items = res.data.data;<br>
			    		this.showDropdown  = this.items.length > 0;<br>
		    		}
		    		</code>
	    		</td>
	            <td>
	                获取列表数据后的回调
	            </td>
	        </tr>
	        <tr>
	        	<td>value <span class="badge">2</span></td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td>选择列表项的值</td>
	        </tr>
	        <tr>
	        	<td>onselect</td>
	        	<td><code>Function</code></td>
	        	<td><code>noop</code></td>
	        	<td>选择列表项的回调 <code>onselectCb(item, vm)</code></td>
	        </tr>
	        <tr>
	        	<td>placeholder</td>
	        	<td><code>String</code></td>
	        	<td><code>请输入关键字</code></td>
	        	<td>文本框的提示</td>
	        </tr>
	        <tr>
	        	<td>itemHtml</td>
	        	<td><code>String</code></td>
	        	<td><code>null</code></td>
	        	<td> 列表项的模板 </td>
	        </tr>
	        <tr>
	        	<td>debounce</td>
	        	<td><code>Number</code></td>
	        	<td><code>100</code></td>
	        	<td> 延迟多少毫秒执行查询 </td>
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
					<form-group label="debounce:" :value.sync="opt.debounce  | mknumber"></form-group>
				</div>
				<div class="col-md-8">
					<form-group label="itemHtml:" :value.sync="opt.itemHtml"></form-group>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<form-group label="placeholder:" :value.sync="opt.placeholder"></form-group>
				</div>
				<div class="col-md-4">
					<form-group label="value:" :value.sync="opt.value"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->

	<div class="row">
		<div class="col-md-4">
			<typeahead :data="opt.data" :placeholder="opt.placeholder" :value.sync="opt.value" :item-html='opt.itemHtml'></typeahead>
		</div>
	</div>

	<hr>
	<div class="row">
		<div class="col-md-4">
			<p>selectedCity: {{selectedCity}}</p>

			<typeahead api="queryCity?name={query}" placeholder="选择城市" :value.sync="selectedCity" ></typeahead>
			<p class="help-block">接口随机提供50个城市的名称，尝试输入"市" "山"</p>
		</div>
	</div>
	
</div>
</template>

<script>
	var options = {
		value: '',
		placeholder: '选择省份',
		itemHtml: '<a>'+
					'<span v-html="item | highlight query"></span>'+
					'<i class="glyphicon glyphicon-heart">5</i>'+
				  '</a>',
		debounce: 30,
		data: [
			'北京',
			'河北',
			'广东',
			'湖南',
			'湖北',
			'广西',
			'江西'
		]
	};

	export default {
		data: function(){
			return {
				'opt': options,
				selectedCity:''
			};
		},
		filters:{
			mknumber:{
				read(v){
					return v;
				},
				write(v){
					return Number(v);
				}
			}
		}
		
	}

</script>

