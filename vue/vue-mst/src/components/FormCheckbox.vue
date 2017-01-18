<template>
	<div class="checkbox">
		<label>
			<input type="checkbox" v-model="value">
			<slot></slot>
		</label>
	</div>
</template>

<script>

  export default {
    props: {
      value: {
      	twoWay: true
      }
    }
  }
</script>
