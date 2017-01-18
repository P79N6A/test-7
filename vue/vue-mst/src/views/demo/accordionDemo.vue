<template>
<div class="demo-page accordion-demo container">
	<h2 class="text-center">Accordion component</h2>
	
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
	            <td width="15%">oneAtATime</td>
	            <td width="10%"><code>Boolean</code></td>
	            <td width="10%"><code>false</code></td>
	            <td>是否只能展开1个面板</td>
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
					<strong>oneAtATime:</strong>
					<label><input type="checkbox" name="chk" id="chk" v-model="opt.oneAtATime"> {{opt.oneAtATime}}</label>
				</div>
			</div>
		</vform>
	</div>
	<!-- try end -->


	<accordion :one-at-atime="opt.oneAtATime">
		<panel  header="vue">
			<h3>vuejs  mvvm</h3>
			<p>some con..</p>
		</panel>
		<panel header="js">
			<h2>js is script</h2>
			<p>hello</p>
		</panel>
		<panel header="php">
			<h2>php</h2>
			<p>echo this</p>
		</panel>
	</accordion>

</div>
</template>

<script>
	var options = {
		oneAtATime: true
	};

	export default {
		data: function(){
			return {
				'opt': options
			};
		}
	}

</script>

