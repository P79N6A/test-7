<template>
<div class="demo-page affix-demo container">
	<h2 class="text-center">Affix component</h2>
	
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
	            <td width="15%">offset</td>
	            <td width="10%"><code>Number</code></td>
	            <td width="10%"><code>0</code></td>
	            <td>吸附时保持的偏移高度</td>
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
					<form-group label="offset:" :value.sync="opt.offset  | mknumber"></form-group>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->

	<affix :offset="opt.offset" class="sharebtn-wrap">
		<div class="sharebtn">分享</div>
	</affix>

	<div style="height:800px"></div>
	
</div>
</template>

<script>
	var options = {
		offset: 50
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		},
		filters: {
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

<style>
	.sharebtn-wrap{
		position: absolute;
		top: 100px;
		right: 50px;
	}

	.sharebtn {
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		border-radius: 50%;
		background-image: -webkit-linear-gradient(top, #B5E385, #A5D9A1);
		opacity: .9;
		cursor: pointer;

	}

	.sharebtn:hover{
		color: hotpink;
		background-image:-webkit-linear-gradient(top, #BaEa85, #A5D9A9);
	}
</style>

