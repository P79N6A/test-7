<template>
	<li :class="{active: tabNav.active}" @click="setActive(tabNav)">
		<a>
			<strong>{{tabNav.header}}</strong><i class="glyphicon glyphicon-heart"></i>haahhawqw 
			<dropdown v-if="tabNav.index===2" btn-text="下拉列表" :links="dropList" :onselect="selectItem"></dropdown>
		</a>
	</li>
</template>

<script>
	export default {
		name: 'TabNavSpecialTypes',
		props: {
			tabNav: Object,
			require: true
		},
		created(){
			if(this.tabNav.index === 2){
				this.dropList = [
					{text:'warning'},
					{text:'info'},
					{text:'danger'},
					{text:'toggle'},
					{text:'toggle too', disabled: true},
					{text:''},
					{text:'to home', url:'/index'}
				];
				this.selectItem = function(link, index, $event) {
					console.warn(link, index, $event.target.textContent);
					var text = $event.target.textContent;
					switch (text = text.toLowerCase()) {
						case 'warning':
						case 'info':
						case 'danger':
							this.$dispatch('alert-type', text);
							break;
						case 'toggle':
							this.$dispatch('alert-toggle');
							break;
						default:
					}

				}
			}
		},
		methods: {
			setActive(tabNav){
				this.$dispatch('activate', tabNav);// tab activate, nav 捕获事件并处理
				this.$dispatch('setActiveIndex', tabNav.index); //tabpane activate ,通过计算属性 关联activeIndex和tabpane.active
			}
		}
	}
</script>