<template>
	<footer>
		<ul>
			<li>DESIGN BY MOBILE UED@KIMI</li>
		</ul>
	</footer>
</template>
<script>
	export default {
		name:'Vfooter',
		data:()=>({})
	}
</script>

<style lang="less">
	@import "../assets/css/vars.less"; 

	footer{height: 50px; margin-top: 20px; line-height: 50px; background-color: @bgcolor; color:@color; text-align: center;}
	footer ul, footer li{list-style: none; margin: 0;}
</style>