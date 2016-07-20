<template>
	<div class="checkbox">
		<label v-for="item in checkList">
			<input type="checkbox" :value="item.value" v-model="value">
			{{item.text}}
		</label>
	</div>
</template>

<script>

  export default {
    props: {
      checkList: Array,
      value: {
      	type: Array,
      	twoWay: true
      }
    }
  }
</script>
